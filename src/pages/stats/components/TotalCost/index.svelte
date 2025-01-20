<script lang="js">
import {concerts} from '../../../../myStore'
import {totalSumYear, filterByGivenYear} from '../../../../helper'

let {year = ''} = $props()
let countNumber = $state(0)

let localData = $state([])

concerts.subscribe((data) => {
	localData = [...data]
})

$effect(() => {
	countNumber = count(year)
})

function thisYear(yearValue) {
	return totalSumYear(localData, parseInt(yearValue, 10))
}

function count(yearValue) {
	return filterByGivenYear(localData, parseInt(yearValue, 10)).length
}
</script>

<div class="stats-wrapper">
	<div class="stats text-xl">
		{#if countNumber}
			<div>Du brukte <strong>{thisYear(year)}</strong> i {year} på {countNumber} konsert{`${countNumber === 1 ? '' : 'er'}`}.</div>
		{/if}
		{#if countNumber === 0}
			<div>Ingen kontert i {year}?</div>
		{/if}
	</div>
</div>
