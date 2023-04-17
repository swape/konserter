<script lang="js">
import {concerts} from '../../../../myStore'
import {filterByGivenYear, sortByBestVenue} from '../../../../helper'

export let year = ''
let sortedVenue = []

$: {
	concerts.subscribe((data) => {
		sortedVenue = sortByBestVenue(filterByGivenYear(data, parseInt(year, 10)))
	})
}
</script>

{#if sortedVenue.length > 0}
	<div class="stats-wrapper">
		<div class="stats">
			<div class="mb-2">Mest besøkte konsertstedene i {year}</div>
			{#each sortedVenue as venue}
				<div class="flex justify-between">
					<span class="text-cyan-800 truncate capitalize">{venue[0]}:</span>
					<span>{venue[1]}</span>
				</div>
			{/each}
		</div>
	</div>
{/if}
