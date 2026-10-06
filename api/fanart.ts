const API_KEY = process.env.FANART_API_KEY
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY ?? process.env.VITE_apiKey
const BASE_URL = 'https://webservice.fanart.tv/v3.2/music/'
const MUSICBRAINZ_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export async function GET(request: Request) {
	if (!API_KEY || !FIREBASE_API_KEY) {
		return json({error: 'Server configuration missing'}, 500)
	}

	const token = getBearerToken(request)
	if (!token || !(await verifyFirebaseToken(token))) {
		return json({error: 'Unauthorized'}, 401)
	}

	const musicBrainzId = new URL(request.url).searchParams.get('mbid')
	if (!MUSICBRAINZ_ID_PATTERN.test(musicBrainzId ?? '')) {
		return json({error: 'Invalid musicBrainzId'}, 400)
	}

	const fanart = await fetchFanart(musicBrainzId as string)
	if (!fanart) {
		return json({error: 'Failed to fetch fanart'}, 502)
	}

	return json(fanart, 200, {'Cache-Control': 'private, max-age=86400'})
}

function getBearerToken(request: Request): string | null {
	const header = request.headers.get('authorization')
	const match = header?.match(/^Bearer\s+(.+)$/i)
	return match?.[1] ?? null
}

async function verifyFirebaseToken(idToken: string): Promise<boolean> {
	try {
		const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(FIREBASE_API_KEY ?? '')}`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({idToken})
		})
		if (!response.ok) {
			return false
		}

		const data = (await response.json()) as {users?: unknown[]}
		return Array.isArray(data.users) && data.users.length > 0
	} catch (error) {
		console.error('Error verifying Firebase token:', error)
		return false
	}
}

function getFanartUrl(musicBrainzId: string) {
	const url = new URL(musicBrainzId, BASE_URL)
	url.searchParams.set('api_key', API_KEY ?? '')
	return url
}

function json(data: unknown, status: number, headers: Record<string, string> = {}) {
	return new Response(JSON.stringify(data), {
		status,
		headers: {'Content-Type': 'application/json; charset=utf-8', ...headers}
	})
}

// this lives on server
export async function fetchFanart(musicBrainzId: string): Promise<unknown | null> {
	try {
		const response = await fetch(getFanartUrl(musicBrainzId))
		if (!response.ok) {
			console.error('Failed to fetch fanart:', response.statusText)
			return null
		}
		return await response.json()
	} catch (error) {
		console.error('Error fetching fanart:', error)
		return null
	}
}
