import {isDev} from './config'

const MUSICBRAINZ_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export function isMusicBrainzId(value: unknown): value is string {
	return typeof value === 'string' && MUSICBRAINZ_ID_PATTERN.test(value)
}

export function isTrustedFanArtUrl(value: unknown): value is string {
	if (typeof value !== 'string') {
		return false
	}

	try {
		const url = new URL(value)
		return url.protocol === 'https:' && !url.username && !url.password && (url.hostname === 'fanart.tv' || url.hostname.endsWith('.fanart.tv'))
	} catch {
		return false
	}
}

export async function getFanArt(mbid: string): Promise<string | null> {
	if (isDev || !isMusicBrainzId(mbid)) {
		return null
	}

	try {
		const {auth} = await import('./fire')
		const token = await auth.currentUser?.getIdToken()
		if (!token) {
			return null
		}

		const response = await fetch(`/api/fanart?mbid=${encodeURIComponent(mbid)}`, {
			headers: {Authorization: `Bearer ${token}`}
		})
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
	return isTrustedFanArtUrl(imageURL) ? imageURL : null
}

interface FanArtData {
	albums?: {
		albumcover?: {url: string}[]
	}[]
	artistbackground?: {url: string}[]
	hdmusiclogo?: {url: string}[]
	artistthumb?: {url: string}[]
}
