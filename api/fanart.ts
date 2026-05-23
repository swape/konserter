export function GET(request: Request) {
	const musicBrainzId = new URL(request.url).searchParams.get('mbid')
	if (!musicBrainzId) { 
		return new Response('Missing musicBrainzId', { status: 400 })
	}


	return new Response('Hello from Vercel!')
}
