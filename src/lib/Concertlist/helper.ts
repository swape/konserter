import type {ConcertObjectType} from "../../types";

export function sortByDate(a: ConcertObjectType, b: ConcertObjectType) {
    const cleanedA = cleanDateToNumber(a.date)
    const cleanedB = cleanDateToNumber(b.date)
    return cleanedA < cleanedB ? 1 : -1
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
