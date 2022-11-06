<script>
import { concerts, currentConcertItem, currentPage } from '../../../../myStore.ts'
import { getArtistAndVenue, sortByDate } from '../../../../helper'

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

function clicked(concert) {
	$currentConcertItem = concert
	$currentPage = 'new'
}
</script>

<div class="p-3">
	{#each localConcerts as concert}
		<button on:click={() => clicked(concert)} class="box mb-3">
			<div>
				<div class="text-xl">{getArtistAndVenue(concert)}</div>
				<div class="flex justify-between text-sm text-gray-400 items-center">
					<small>{concert.date}</small>
					{#if concert.festival}
						<div>{concert.festival}</div>
					{/if}
					{#if concert.rating}
						<div class="flex items-center">
							<span class="material-icons">star</span>
							<span>{concert.rating}</span>
						</div>
					{/if}
				</div>
			</div>
		</button>
	{/each}
</div>
