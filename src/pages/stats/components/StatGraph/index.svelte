<script lang="js">
import {concerts} from '../../../../myStore'
import {filterByGivenYear, getGraphData} from '../../../../helper'
import {LinkedChart} from 'svelte-tiny-linked-charts'
import ConsertBox from '../../../frontpage/components/ConcertBox/index.svelte'

export let year = ''
let conserts = []
let graphData = []
let details = ''
let filteredConserts = []

$: {
	concerts.subscribe((data) => {
		conserts = filterByGivenYear(data, parseInt(year, 10))
		graphData = getGraphData(conserts)
		filteredConserts = []
		details = ''
	})
}

function addDetails(value) {
	filteredConserts = conserts.filter((consert) => consert.date === value.key)
	details = `${value.key}: ${value.value}`
}
</script>

{#if conserts.length > 0}
	<div class="flex justify-between bg-white m-3 p-3 rounded-md items-center">
		<LinkedChart data={graphData} on:hover={(event) => addDetails(event.detail)} dispatchEvents={true} />
		<div>{details}</div>
	</div>
	<div class="flex flex-col m-3 rounded-md mt-6">
		{#each filteredConserts as concert}
			<ConsertBox concert={concert} />
		{/each}
	</div>
{/if}
