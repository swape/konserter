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

<section class="mb-6 text-white" aria-labelledby="total-concerts-title">
	<h2 id="total-concerts-title" class="flex items-center justify-center gap-2 text-xl font-semibold">
		<span class="material-icons" aria-hidden="true">music_note</span>
		{$concerts.length} konserter totalt
	</h2>
	{#if highestCount !== 0}
		<div class="mb-4 overflow-hidden" role="img" aria-label="Konserter per måned. Høyeste måned har {highestCount} konserter.">
			<div class="bars mt-3 border-b border-slate-700">
				{#each Object.keys(completeList) as key}
					<div title="{toYearMonth(key)}: {completeList[key].count}" class="bar" style="height: {(completeList[key].count / highestCount) * 100}%" aria-hidden="true">&nbsp;</div>
				{/each}
			</div>
		</div>
	{/if}
</section>
