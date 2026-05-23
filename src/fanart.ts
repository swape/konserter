import {isDev} from './config'

export async function getFanArt(mbid: string): Promise<string | null> {
	if (isDev) {
		return null
	}

	const URL = `/api/fanart?mbid=${mbid}`
	try {
		const response = await fetch(URL)
		if (!response.ok) {
			console.error('Failed to fetch fanart:', response.statusText)
			return null
		}
		const data: FanArtData | null = await response.json()
		return convertFanArtData(data)
	} catch (error) {
		console.error('Error fetching fanart:', error)
		return null
	}
}

function convertFanArtData(data: FanArtData | null): string | null {
	let imageURL: string | null = null
	if (!data || typeof data !== 'object') {
		return null
	}

	if (data.artistbackground && data.artistbackground.length > 0) {
		imageURL = data.artistbackground[0].url
	} else if (data.hdmusiclogo && data.hdmusiclogo.length > 0) {
		imageURL = data.hdmusiclogo[0].url
	} else if (data.artistthumb && data.artistthumb.length > 0) {
		imageURL = data.artistthumb[0].url
	} else if (data.albums && data.albums.length > 0 && data.albums[0].albumcover && data.albums[0].albumcover.length > 0) {
		imageURL = data.albums[0].albumcover[0].url
	}
	return imageURL
}

interface FanArtData {
	albums?: {
		albumcover?: {url: string}[]
	}[]
	artistbackground?: {url: string}[]
	hdmusiclogo?: {url: string}[]
	artistthumb?: {url: string}[]
}
