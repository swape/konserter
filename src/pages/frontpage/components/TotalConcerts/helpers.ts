import type {ConcertObjectType} from '../../../../types'

export type YearMonthRecord = Record<string, {count: number}>

const date = new Date()
export const currentYear = date.getFullYear()
export const nextMonth = date.getMonth() + 2

export function yearMonthList(list: ConcertObjectType[]): YearMonthRecord {
	const newList: YearMonthRecord = {}
	list.forEach((concert) => {
		const dateSplit = concert.date.split('-')
		const year = dateSplit[0]
		const month = dateSplit[1]
		const key = `${year}${month}`
		if (Number.parseInt(year, 10) === currentYear && Number.parseInt(month, 10) > nextMonth) {
			return
		}
		if (!newList[key]) {
			newList[key] = {count: 0}
		}

		newList[key].count = newList[key].count + 1
	})
	return newList
}

export function addEmptyYearMonth(list: YearMonthRecord): YearMonthRecord {
	if (Object.keys(list).length === 0) {
		return list
	}

	const newList: YearMonthRecord = {...list}
	const findHighestKey = Object.keys(list).sort((a, b) => Number(b) - Number(a))[0]
	const findLowestKey = Object.keys(list).sort((a, b) => Number(a) - Number(b))[0]

	const highestYear = Number(findHighestKey.slice(0, 4))
	const lowestYear = Number(findLowestKey.slice(0, 4))
	for (let i = highestYear; i >= lowestYear; i--) {
		for (let j = 12; j >= 1; j--) {
			const month = j.toString().padStart(2, '0')
			const key = `${i}${month}`
			if (!newList[key] && i <= currentYear) {
				if ((i === currentYear && j >= nextMonth) || Number.parseInt(findLowestKey, 10) > Number.parseInt(key, 10)) {
					break
				}
				newList[key] = {count: 0}
			}
		}
	}
	return newList
}

export function toYearMonth(key: string): string {
	const year = key.slice(0, 4)
	const month = key.slice(4, 6)
	return `${year}-${month}`
}
