<script>
import {concerts} from '../../../../myStore.ts'
import {sortByDate} from '../../../../helper'
import ConcertBox from '../ConcertBox/index.svelte'
export let limit

let localConcerts = []

concerts.subscribe((data) => {
	if (limit) {
		localConcerts = data
			.map((item, index) => (index < limit ? item : null))
			.filter((item) => item)
			.sort(sortByDate)
	} else {
		localConcerts = [...data.sort(sortByDate)]
	}
})
</script>

<div class="p-3">
	{#each localConcerts as concert}
		<ConcertBox concert={concert} />
	{/each}
</div>
