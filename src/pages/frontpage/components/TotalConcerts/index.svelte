<script>
import {concerts} from '../../../../myStore'

const date = new Date()
const currentYear = date.getFullYear()
const nextMonth = date.getMonth() + 2

function yearMonthList(list) {
	const newList = {}
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

function addEmptyYearMonth(list) {
	if (Object.keys(list).length === 0) {
		return list
	}

	const newList = {...list}
	const findHighestKey = Object.keys(list).sort((a, b) => b - a)[0]
	const findLowestKey = Object.keys(list).sort((a, b) => a - b)[0]

	const highestYear = findHighestKey.slice(0, 4)
	const lowestYear = findLowestKey.slice(0, 4)
	for (let i = highestYear; i >= lowestYear; i--) {
		for (let j = 12; j >= 1; j--) {
			const month = j.toString().padStart(2, '0')
			const key = `${i}${month}`
			if (!newList[key] && i <= currentYear) {
				if ((Number.parseInt(i, 10) === currentYear && j >= nextMonth) || Number.parseInt(findLowestKey, 10) > Number.parseInt(key, 10)) {
					break
				}
				newList[key] = {count: 0}
			}
		}
	}
	return newList
}

let highestCount = $state(0)
let completeList = $state({})

concerts.subscribe((value) => {
	if (value) {
		const yearMonthObject = yearMonthList(value)
		completeList = addEmptyYearMonth(yearMonthObject)
		if (Object.values(completeList).length > 0) {
			highestCount = Object.values(completeList).sort((a, b) => b.count - a.count)[0].count
		}
	}
})

function toYearMonth(key) {
	const year = key.slice(0, 4)
	const month = key.slice(4, 6)
	return `${year}-${month}`
}
</script>

<div class="flex justify-center items-center text-white">
	<span class="material-icons">music_note</span>
	{$concerts.length} konserter totalt.
</div>
{#if highestCount !== 0}
	<div class="overflow-hidden">
		<div class="bars border-slate-800 mt-3 border-b">
			{#each Object.keys(completeList) as key}
				<div title={toYearMonth(key)} class="bar" style="height: {(completeList[key].count / highestCount) * 100}%">&nbsp;</div>
			{/each}
		</div>
	</div>
{/if}
