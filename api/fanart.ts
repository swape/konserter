import {fetchFanart} from '../src/fanart'

export async function GET(request: Request) {
	const musicBrainzId = new URL(request.url).searchParams.get('mbid')
	if (!musicBrainzId) { 
		return new Response('Missing musicBrainzId', { status: 400 })
	}

	const fanart = await fetchFanart(musicBrainzId)
	if (!fanart) {
		return new Response('Failed to fetch fanart', { status: 500 })
	}

	return new Response(JSON.stringify(fanart), { status: 200 })
}
