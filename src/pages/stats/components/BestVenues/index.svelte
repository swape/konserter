<script lang="ts">
import {concerts} from '../../../../myStore'
import {filterByGivenYear, sortByBestVenue} from '../../../../helper'
import type {ConcertObjectType} from '../../../../types'

let {year = ''} = $props()
let sortedVenue = $state<[string, number][]>([])
let localData = $state<ConcertObjectType[]>([])

concerts.subscribe((data) => {
	localData = data.filter((item: ConcertObjectType) => !item.deleted) as ConcertObjectType[]
})

$effect(() => {
	sortedVenue = sortByBestVenue(filterByGivenYear(localData, Number.parseInt(year, 10))).filter((item) => item[0])
})
</script>

{#if sortedVenue.length > 0}
	<div class="stats-wrapper">
		<div class="stats">
			<div class="mb-4 text-xl flex items-center flex-wrap gap-1"><span class="material-icons">map</span> <span>Mest besøkte</span> <span>konsertstedene i {year}</span></div>
			{#each sortedVenue as venue}
				<div class="flex justify-between">
					<span class=" truncate capitalize">{venue[0]}:</span>
					<span>{venue[1]}</span>
				</div>
			{/each}
		</div>
	</div>
{/if}
