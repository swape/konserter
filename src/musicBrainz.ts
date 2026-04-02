/// <reference types="vite/client" />
import {searchItems, syncItems, updateEntry} from './fire'
import {MusicBrainzApi} from 'musicbrainz-api'
import type {IArtist, IArtistMatch} from 'musicbrainz-api'
import type {BandInfo} from './types'

const mbApi = new MusicBrainzApi({
	appName: 'konserter.swape.net',
	appVersion: '0.1.0',
	appContactInfo: import.meta.env.VITE_MUSICBRAINZ_EMAIL
})

export function searchArtistFromFirebase(artistName: string, cb: (data: BandInfo | null) => void): void {
	searchItems('musicBrainz', 'artist', artistName, (data: BandInfo | null) => {
		if (data) {
			cb(data)
		} else {
			// search from musicBrainz and add to firebase
			searchArtistFromMusicBrainz(artistName)
				.then((mbData) => {
					// store this to firebase and return the data
					if (mbData && !Array.isArray(mbData) && mbData.id) {
						const newObj = convertToBandInfo(mbData)
						addArtistInfoToFirebase(mbData.id, newObj)
						cb(newObj)
					} else {
						cb(null)
					}
				})
				.catch((error) => {
					console.error('Error searching artist from MusicBrainz:', error)
				})
		}
	})
}

export function convertToBandInfo(data: IArtist): BandInfo {
	return {
		artist: data.name ?? '',
		fetchedDate: new Date().toISOString(),
		mbid: data.id,
		data: {
			type: data.type,
			disambiguation: data.disambiguation ?? '',
			formed: data['life-span']?.begin ?? '',
			country: data.country ?? '',
			genre: data.tags
				? data.tags
						.filter((tag) => tag.count > 2)
						.map((tag) => tag.name)
						.join(', ')
				: ''
		}
	}
}

export async function searchArtistFromMusicBrainz(artistName: string, all: true): Promise<IArtistMatch[]>
export async function searchArtistFromMusicBrainz(artistName: string, all?: false): Promise<IArtistMatch | IArtistMatch[] | null>
export async function searchArtistFromMusicBrainz(artistName: string, all?: boolean): Promise<IArtistMatch | IArtistMatch[] | null> {
	try {
		const query = `artist:${artistName}`
		const result = await mbApi.search('artist', {query})

		if (all) {
			return result?.artists ?? []
		}

		if (result?.artists?.length === 1) {
			return result.artists[0]
		} else {
			return result.artists
		}
	} catch (error) {
		console.error('Error searching artist from MusicBrainz:', error)
		return null
	}
}

export async function addArtistInfoToFirebase(mbid: string, data: BandInfo): Promise<void> {
	updateEntry(`musicBrainz/${mbid}`, data)
}

export function searchArtistFromFirebaseByMBID(mbid: string, cb: (data: BandInfo | null) => void): void {
	syncItems(`musicBrainz/${mbid}`, (data: BandInfo | null) => {
		cb(data ?? null)
	})
}
