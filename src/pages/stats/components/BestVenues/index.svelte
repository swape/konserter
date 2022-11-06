<script>
import { concerts } from '../../../../myStore.ts'
import { filterByThisYear, sortByBestVenue } from '../../../../helper.ts'

let sortedVenue = []
concerts.subscribe((data) => {
	sortedVenue = sortByBestVenue(filterByThisYear(data))
})
</script>

<div class="stats-wrapper">
	<div class="stats">
		<div class="mb-2">Mest besøkte konsert-stedene i år</div>
		{#each sortedVenue as venue}
			<div class="flex justify-between">
				<span class="text-cyan-800 truncate capitalize">{venue[0]}:</span>
				<span>{venue[1]}</span>
			</div>
		{/each}
	</div>
</div>
