<script>
import {currentConcertItem, currentPage} from '../../../../myStore'
import {getArtistAndVenue} from '../../../../helper'

let {concert} = $props()
function clicked() {
	currentConcertItem.set(concert)
	currentPage.set('new')
}
</script>

<button onclick={() => clicked()} class="box mb-3">
	<span class="block p-3">
		<span class="text-xl">{getArtistAndVenue(concert)}</span>
		<span class="flex justify-between text-sm text-gray-400 items-center">
			<small>{concert?.date}</small>
			{#if concert?.festival}
				<div>{concert.festival}</div>
			{/if}
			{#if concert?.rating}
				<span class="flex items-center">
					<span class="material-icons">star</span>
					<span>{concert.rating}</span>
				</span>
			{/if}
		</span>
	</span>
</button>
