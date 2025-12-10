<script>
import {currentConcertItem, currentPage} from '../../../../myStore'
import {getArtistAndVenue} from '../../../../helper'
import StarBox from '../../../../lib/StarBox/index.svelte'

let {concert} = $props()

function clicked() {
	currentConcertItem.set(concert)
	currentPage.set('new')
}
</script>

<button onclick={() => clicked()} class="box mb-1">
	<span class={['block p-2', concert?.deleted && 'opacity-50'].join(' ')}>
		<span class="text-[1.1rem] px-12">{getArtistAndVenue(concert)}</span>
		<span class="flex justify-between text-sm text-gray-700 dark:text-white items-center mt-2">
			{#if concert?.rating}
				<StarBox rating={concert.rating} />
			{/if}

			{#if concert?.festival}
				<div class="truncate text-gray-700 dark:text-gray-300">{concert.festival}</div>
			{/if}

			<small class="text-gray-700 dark:text-gray-300">{concert?.date}</small>
		</span>
	</span>
</button>
