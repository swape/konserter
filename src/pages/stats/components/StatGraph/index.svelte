<script lang="js">
import {concerts} from '../../../../myStore'
import {filterByGivenYear, getGraphData} from '../../../../helper'
import {LinkedChart} from 'svelte-tiny-linked-charts'
import ConcertBox from '../../../frontpage/components/ConcertBox/index.svelte'

export let year = ''
let concertsSortedByDate = []
let graphData = []
let details = ''
let filteredConcerts = []

$: {
	concerts.subscribe((data) => {
		concertsSortedByDate = filterByGivenYear(data, parseInt(year, 10))
		graphData = getGraphData(concertsSortedByDate)
		filteredConcerts = []
		details = ''
	})
}

function addDetails(value) {
	filteredConcerts = concertsSortedByDate.filter((concert) => concert.date === value.key)
	details = `${value.key}: ${value.value}`
}
</script>

{#if concertsSortedByDate.length > 0}
	<div class="flex justify-between bg-white m-3 p-3 rounded-md items-center">
		<LinkedChart data={graphData} on:hover={(event) => addDetails(event.detail)} dispatchEvents={true} />
		<div>{details}</div>
	</div>
	<div class="flex flex-col m-3 rounded-md mt-6">
		{#each filteredConcerts as concert}
			<ConcertBox concert={concert} />
		{/each}
	</div>
{/if}
