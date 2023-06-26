<script>
import {concerts} from '../../../../myStore'
import {sortByDate, cleanDateToNumber, getFormattedDate} from '../../../../helper'
import ConcertBox from '../ConcertBox/index.svelte'

export let limit = undefined

let futureConcerts = []
let pastConcerts = []
$: newDate = new Date()

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
	{#each pastConcerts as concert}
		<ConcertBox concert={concert} />
	{/each}

	{#if futureConcerts.length > 0}
		<h2 class="text-2xl text-center py-5 text-white">Kommende konserter</h2>
	{/if}

	{#each futureConcerts as futureConcert}
		<ConcertBox concert={futureConcert} />
	{/each}
</div>
