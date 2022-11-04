import type { ConcertObjectType } from '../../types'

export function sortByDate(a: ConcertObjectType, b: ConcertObjectType) {
  const cleanedA = cleanDateToNumber(a.date)
  const cleanedB = cleanDateToNumber(b.date)
  return cleanedA < cleanedB ? 1 : -1
}

interface VenueSort{
  [key: string]: number
}

export function sortByBestVenue(concertList: ConcertObjectType[]) {
  const venues: VenueSort = {}
  concertList.forEach((item) => {
    const cleanedVenue = item.venue.trim().toLocaleLowerCase()
    if (venues[cleanedVenue]) {
      venues[cleanedVenue] += 1
    } else {
      venues[cleanedVenue] = 1
    }
  })
  return Object.entries(venues).sort((a: unknown, b: unknown) => {
    return a[1] < b[1] ? 1 : -1
  })
}

export function getArtistAndVenue(concert: ConcertObjectType) {
  return `${concert?.artist}${concert?.venue ? ' @ ' + concert.venue : ''}`
}

export function cleanDateToNumber(value: string): number {
  if (!value) {
    return 0
  }
  return parseInt(value.replace(/-/g, ''), 10)
}
