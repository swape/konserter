<script lang="ts">
import {concerts} from '../../../../myStore'
import {totalSumYear, filterByGivenYear} from '../../../../helper'
import type {ConcertObjectType} from '../../../../types'

let {year = ''} = $props()
let countNumber = $state(0)

let localData = $state<ConcertObjectType[]>([])

concerts.subscribe((data) => {
	localData = [...data.filter((item: ConcertObjectType) => !item.deleted)] as ConcertObjectType[]
})

$effect(() => {
	countNumber = count(year)
})

function thisYear(yearValue: string) {
	return totalSumYear(localData, Number.parseInt(yearValue, 10))
}

function count(yearValue: string) {
	return filterByGivenYear(localData, Number.parseInt(yearValue, 10)).length
}
</script>

<div class="stats-wrapper">
	<div class="stats text-xl">
		{#if countNumber}
			<div class="flex items-center gap-1 flex-wrap">
				<span class="material-icons">payments</span>
				Du brukte <strong>{thisYear(year)}</strong> <span>i {year} <span> på {countNumber} konsert{`${countNumber === 1 ? '' : 'er'}`}.</span> </span>
			</div>
		{/if}
		{#if countNumber === 0}
			<div>Ingen konterter i {year}?</div>
		{/if}
	</div>
</div>
