<script>
import {concerts} from '../../../../myStore'

const date = new Date()
const currentYear = date.getFullYear()
const nextMonth = date.getMonth() + 2

function yearMonthList(list) {
	let newList = {}
	list.forEach((concert) => {
		let dateSplit = concert.date.split('-')
		let year = dateSplit[0]
		let month = dateSplit[1]
		let key = `${year}${month}`
		if (parseInt(year, 10) === currentYear && parseInt(month, 10) > nextMonth) {
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

	let newList = {...list}
	let findHighestKey = Object.keys(list).sort((a, b) => b - a)[0]
	let findLowestKey = Object.keys(list).sort((a, b) => a - b)[0]

	let highestYear = findHighestKey.slice(0, 4)
	let lowestYear = findLowestKey.slice(0, 4)
	for (let i = highestYear; i >= lowestYear; i--) {
		for (let j = 12; j >= 1; j--) {
			let month = j.toString().padStart(2, '0')
			let key = `${i}${month}`
			if (!newList[key] && i <= currentYear) {
				if ((parseInt(i, 10) === currentYear && j >= nextMonth) || parseInt(findLowestKey, 10) > parseInt(key, 10)) {
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
	let year = key.slice(0, 4)
	let month = key.slice(4, 6)
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
