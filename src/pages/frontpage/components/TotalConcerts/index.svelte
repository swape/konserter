<script>
import {concerts} from '../../../../myStore'

function yearMonthList(list) {
	let newList = {}
	list.forEach((concert) => {
		let dateSplit = concert.date.split('-')
		let year = dateSplit[0]
		let month = dateSplit[1]
		let key = `${year}${month}`
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
			if (!newList[key]) {
				newList[key] = {count: 0}
			}
		}
	}
	return newList
}

let highestCount = 0
let completeList = {}

concerts.subscribe((value) => {
	if (value) {
		const yearMonthObject = yearMonthList(value)
		completeList = addEmptyYearMonth(yearMonthObject)
		if (Object.values(completeList).length > 0) {
			highestCount = Object.values(completeList).sort((a, b) => b.count - a.count)[0].count
		}
	}
})
</script>

<div class="flex justify-center items-center text-white">
	<span class="material-icons">music_note</span>
	{$concerts.length} konserter totalt.
</div>
{#if highestCount !== 0}
	<div>
		<div class="bars border-slate-800 mt-3 border-b">
			{#each Object.keys(completeList) as key}
				<div title={key} class="bar" style="height: {(completeList[key].count / highestCount) * 100}%">&nbsp;</div>
			{/each}
		</div>
	</div>
{/if}
