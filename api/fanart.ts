const API_KEY = process.env.FANART_API_KEY
const BASE_URL = 'https://webservice.fanart.tv/v3.2/music/'

export async function GET(request: Request) {
	if (!API_KEY) {
		return new Response('Missing API key', {status: 400})
	}
	const musicBrainzId = new URL(request.url).searchParams.get('mbid')
	if (!musicBrainzId) {
		return new Response('Missing musicBrainzId', {status: 400})
	}

	const fanart = await fetchFanart(musicBrainzId)
	if (!fanart) {
		return new Response('Failed to fetch fanart', {status: 500})
	}

	return new Response(JSON.stringify(fanart), {status: 200})
}

function getFanartUrl(musicBrainzId: string) {
	return `${BASE_URL}${musicBrainzId}?api_key=${API_KEY}`
}

// this lives on server
export async function fetchFanart(musicBrainzId: string): Promise<string | null> {
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
