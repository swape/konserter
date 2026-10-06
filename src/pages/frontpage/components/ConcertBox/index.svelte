<script lang="ts">
import {currentConcertItem, currentPage} from '../../../../myStore'
import {getArtistAndVenue} from '../../../../helper'
import StarBox from '../../../../lib/StarBox/index.svelte'
import type {ConcertObjectType} from '../../../../types'

let {concert}: {concert: ConcertObjectType} = $props()

function clicked() {
	currentConcertItem.set(concert)
	currentPage.set('new')
}
</script>

<button onclick={clicked} class="box concert-card" type="button" aria-label="Åpne {getArtistAndVenue(concert)} {concert?.date}">
	<span class={['block p-4', concert?.deleted && 'opacity-50'].join(' ')}>
		<span class="block text-lg font-semibold text-pretty">{getArtistAndVenue(concert)}</span>
		<span class="mt-3 flex items-center justify-between gap-3 text-sm text-slate-200">
			{#if concert?.rating}
				<StarBox rating={concert.rating} />
			{/if}

			{#if concert?.festival}
				<span class="truncate">{concert.festival}</span>
			{/if}

			<time class="text-slate-300" datetime={concert?.date}>{concert?.date}</time>
		</span>
	</span>
</button>
