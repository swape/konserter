import type {ConcertObjectType, ChartData} from './types'

export function sortByDate(a: ConcertObjectType, b: ConcertObjectType) {
	const cleanedA = cleanDateToNumber(a.date)
	const cleanedB = cleanDateToNumber(b.date)
	return cleanedA < cleanedB ? 1 : -1
}

interface VenueSort {
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
	return Object.entries(venues).sort((a: [string, number], b: [string, number]) => {
		return a[1] < b[1] ? 1 : -1
	})
}

export function getArtistAndVenue(concert: ConcertObjectType) {
	const venue = concert?.venue.trim()
	const venueString = ` @ ${venue}`
	return `${concert?.artist}${venue ? venueString : ''}`
}

export function cleanDateToNumber(value: string): number {
	if (!value) {
		return 0
	}
	return parseInt(value.replace(/-/g, ''), 10)
}

export function isDataOk(item: ConcertObjectType | undefined): boolean {
	if (!item) {
		return false
	}
	return !!`${item?.artist || ''}`.trim() && !!item.date
}

export function toNumber(value: string | number): number {
	return parseInt(`${value}`.replace(/\D/g, ''), 10)
}

export function getFormattedDate(nowDate = new Date(), addMonth = 0): string {
	const day = `${nowDate.getDate()}`.padStart(2, '0')
	const month = `${nowDate.getMonth() + addMonth}`.padStart(2, '0')
	return `${nowDate.getFullYear()}-${month}-${day}`
}

export function getEmptyConcertItem(): ConcertObjectType {
	return {
		date: getFormattedDate(new Date(), 1),
		artist: '',
		note: '',
		rating: 3,
		festival: '',
		venue: '',
		price: 0
	}
}

const intNoFormat = new Intl.NumberFormat('no-NO', {style: 'currency', currency: 'NOK'})
const convertToNoCurrency = (value: number) => intNoFormat.format(value).replace('NOK', 'kr')

export function countSum(list: ConcertObjectType[]) {
	let total = 0
	list.forEach((item: ConcertObjectType) => {
		total += item.price || 0
	})
	return convertToNoCurrency(total)
}

export function totalSumThisYear(list: ConcertObjectType[]) {
	const thisYearConcert = filterByThisYear(list)
	return countSum(thisYearConcert)
}

export function totalSumYear(list: ConcertObjectType[], year: number) {
	const thisYearConcert = filterByGivenYear(list, year)
	return countSum(thisYearConcert)
}

export function filterByThisYear(list: ConcertObjectType[]) {
	const now = new Date()
	const thisYear = now.getFullYear()
	return filterByGivenYear(list, thisYear)
}

export function filterByGivenYear(list: ConcertObjectType[], year: number) {
	return list.filter((item) => {
		const itemYear = item.date.split('-')[0]
		return parseInt(itemYear, 10) === year
	})
}

export function getMonthObject(): ChartData {
	const newList: ChartData = {}
	;[...Array(12)].forEach((_: unknown, i: number) => {
		newList[`${i}`.padStart(2, '0')] = 1
	})
	return newList
}

export function sortByMonth(list: ConcertObjectType[]) {
	const newList = getMonthObject()

	list.forEach((concert) => {
		const month = concert.date.split('-')[1]

		if (newList[month]) {
			newList[month] = newList[month] + 1
		} else {
			newList[month] = 1
		}
	})
	return newList
}

export function getGraphData(list: ConcertObjectType[]) {
	const newList: ChartData = {}
	list.sort(sortByDate)
	list.reverse()
	list.forEach((concert) => {
		if (newList[concert.date]) {
			newList[concert.date] = newList[concert.date] + 1
		} else {
			newList[concert.date] = 1
		}
	})
	return newList
}

export function getMostLikedArtists(list: ConcertObjectType[]) {
	const newList: ChartData = {}
	list.sort(sortByDate)
	list.reverse()
	list.forEach((concert) => {
		if (newList[concert.artist]) {
			newList[concert.artist] = newList[concert.artist] + 1
		} else {
			newList[concert.artist] = 1
		}
	})
	return Object.entries(newList)
		.sort((a: [string, number], b: [string, number]) => {
			return `${a[0]}`.toLowerCase() < `${b[0]}`.toLowerCase() ? 1 : -1
		})
		.sort((a: [string, number], b: [string, number]) => {
			return a[1] < b[1] ? 1 : -1
		})
}
