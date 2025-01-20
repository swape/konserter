<script>
import {concerts} from '../../../../myStore'
import {sortByDate, cleanDateToNumber, getFormattedDate} from '../../../../helper'
import ConcertBox from '../ConcertBox/index.svelte'

let {limit = undefined} = $props()

let futureConcerts = $state([])
let pastConcerts = $state([])
let newDate = $state(new Date())

concerts.subscribe((data) => {
	const now = cleanDateToNumber(getFormattedDate(newDate)) + 100
	data.sort(sortByDate)
	futureConcerts = data.filter((item) => cleanDateToNumber(item?.date) > now)
	pastConcerts = data.filter((item) => cleanDateToNumber(item?.date) <= now)

	if (limit) {
		futureConcerts = futureConcerts
			.reverse()
			.map((item, index) => (index < limit ? item : null))
			.filter((item) => item)
		pastConcerts = pastConcerts.map((item, index) => (index < limit ? item : null)).filter((item) => item)
	}
})
</script>

<div class="p-3">
	{#if futureConcerts.length > 0}
		<h2 class="text-2xl text-center py-5 text-white">Kommende konserter</h2>
		{#each futureConcerts as futureConcert}
			<ConcertBox concert={futureConcert} />
		{/each}
	{/if}

	<h2 class="text-2xl text-center py-5 text-white">Konserter</h2>
	{#each pastConcerts as concert}
		<ConcertBox concert={concert} />
	{/each}
</div>
