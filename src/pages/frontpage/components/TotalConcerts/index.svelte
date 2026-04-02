<script lang="ts">
import {concerts} from '../../../../myStore'
import {yearMonthList, addEmptyYearMonth, toYearMonth} from './helpers'
import type {YearMonthRecord} from './helpers'

let highestCount = $state(0)
let completeList = $state<YearMonthRecord>({})

concerts.subscribe((value) => {
	if (value) {
		const yearMonthObject = yearMonthList(value.filter((item) => !item.deleted))
		completeList = addEmptyYearMonth(yearMonthObject)
		if (Object.values(completeList).length > 0) {
			highestCount = Object.values(completeList).sort((a, b) => b.count - a.count)[0].count
		}
	}
})
</script>

<div class="flex justify-center items-center text-white text-xl">
	<span class="material-icons">music_note</span>
	{$concerts.length} konserter totalt.
</div>
{#if highestCount !== 0}
	<div class="overflow-hidden mb-4">
		<div class="bars border-slate-800 mt-3 border-b">
			{#each Object.keys(completeList) as key}
				<div title={toYearMonth(key)} class="bar" style="height: {(completeList[key].count / highestCount) * 100}%">&nbsp;</div>
			{/each}
		</div>
	</div>
{/if}
