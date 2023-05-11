<script>
import {currentConcertItem, currentPage} from '../../../../myStore'
import {getArtistAndVenue} from '../../../../helper'

export let concert

function clicked() {
	currentConcertItem.set(concert)
	currentPage.set('new')
}
</script>

<button on:click={() => clicked()} class="box mb-3">
	<div>
		<div class="text-xl">{getArtistAndVenue(concert)}</div>
		<div class="flex justify-between text-sm text-gray-400 items-center">
			<small>{concert?.date}</small>
			{#if concert?.festival}
				<div>{concert.festival}</div>
			{/if}
			{#if concert?.rating}
				<div class="flex items-center">
					<span class="material-icons">star</span>
					<span>{concert.rating}</span>
				</div>
			{/if}
		</div>
	</div>
</button>
