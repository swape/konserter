const API_KEY = import.meta.env.VITE_FANART_API_KEY
const BASE_URL = 'https://webservice.fanart.tv/v3.2/music/'

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
