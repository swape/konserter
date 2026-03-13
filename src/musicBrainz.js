import {searchItems, syncItems, updateEntry} from './fire.js'

import {MusicBrainzApi} from 'musicbrainz-api'

const mbApi = new MusicBrainzApi({
	appName: 'konserter.swape.net',
	appVersion: '0.1.0',
	appContactInfo: import.meta.env.VITE_MUSICBRAINZ_EMAIL
})

export function searchArtistFromFirebase(artistName, cb) {
	searchItems('musicBrainz', 'artist', artistName, (data) => {
		if (data) {
			cb(data)
		} else {
			// search from musicBrainz and add to firebase
			searchArtistFromMusicBrainz(artistName)
				.then((mbData) => {
					// store this to firebase and return the data
					if (mbData?.id) {
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

export function convertToBandInfo(data) {
	return {
		artist: data.name,
		fetchedDate: new Date().toISOString(),
		mbid: data.id,
		data: {
			type: data.type,
			disambiguation: data.disambiguation || '',
			formed: data['life-span']?.begin || '',
			country: data.country || '',
			genre: data.tags
				? data.tags
						.filter((tag) => tag.count > 2)
						.map((tag) => tag.name)
						.join(', ')
				: ''
		}
	}
}

export async function searchArtistFromMusicBrainz(artistName, all = false) {
	try {
		const query = `artist:${artistName}`
		const result = await mbApi.search('artist', {query})

		if (all) {
			return result?.artists || []
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

export async function addArtistInfoToFirebase(mbid, data) {
	updateEntry(`musicBrainz/${mbid}`, data)
}

export function searchArtistFromFirebaseByMBID(mbid, cb) {
	syncItems(`musicBrainz/${mbid}`, (data) => {
		cb(data ?? null)
	})
}
