import { searchItems, syncItems, updateEntry } from './fire.js'

import { MusicBrainzApi } from 'musicbrainz-api';

const mbApi = new MusicBrainzApi({
  appName: 'konserter.swape.net',
  appVersion: '0.1.0',
  appContactInfo: import.meta.env.VITE_MUSICBRAINZ_EMAIL,
});


export function searchArtistFromFirebase(artistName, cb) {
  searchItems('musicBrainz', 'artist', artistName, (data) => {
    if (data) {
      cb(data)
    } else {
      // search from musicBrainz and add to firebase
      searchArtistFromMusicBrainz(artistName).then((mbData) => {
        // store this to firebase and return the data
        if (mbData) {
          const newObj = {
            artist: mbData.name,
            fetchedDate: new Date().toISOString(),
            mbid: mbData.id,
            data: {
              country: mbData.country,
              members: mbData['artist-relation-list'] ? mbData['artist-relation-list'].map((member) => ({ name: member.artist.name })) : [],
              genre: mbData.tags ? mbData.tags.map((tag) => tag.name).join(', ') : '',
              label: mbData['label-relation-list'] ? mbData['label-relation-list'].map((label) => label.label.name).join(', ') : '',
              url: `https://musicbrainz.org/artist/${mbData.id}`,
            }
          }
          addArtistInfoToFirebase(mbData.id, newObj)
          cb(newObj)
        } else {
          cb(null)
        }
      }).catch((error) => {
        console.error('Error searching artist from MusicBrainz:', error)

      })
    }
  })
}
// https://musicbrainz.org/ws/2/artist/?0=Q&1=u&2=e&3=e&4=n&5=s&6=+&7=o&8=f&9=+&10=t&11=h&12=e&13=+&14=S&15=t&16=o&17=n&18=e&19=+&20=A&21=g&22=e&fmt=json
export async function searchArtistFromMusicBrainz(artistName) {
  try {
    const query = `artist:${artistName}`
    const result = await mbApi.search('artist', { query })

    if (result.artists && result.artists.length > 0) {
      return result.artists[0]
    } else {
      return null
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
    if (data) {
      cb(data)
    } else {
      cb(null)
    }
  })
}
