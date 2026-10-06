<script lang="ts">
import {searchArtistFromFirebaseByMBID} from '../../../../musicBrainz'
import type {BandInfo} from '../../../../types'
import StarBox from '../../../../lib/StarBox/index.svelte'
import {isTrustedFanArtUrl} from '../../../../fanart'

let {showForm, concertObject} = $props()
let bandInfo: BandInfo | undefined = $state(undefined)
let fanArtUrl = $state('')

$effect(() => {
	if (!bandInfo?.mbid) {
		searchArtistFromFirebaseByMBID(concertObject.mbid, (data) => {
			if (data) {
				bandInfo = data as BandInfo
				fanArtUrl = isTrustedFanArtUrl(bandInfo.fanartData) ? bandInfo.fanartData : ''
			}
		})
	}
})
</script>

<div>
	<div
		class="relative mx-4 overflow-hidden rounded-2xl bg-gradient-to-r from-[#05009d] to-[#439a05] bg-cover bg-center"
		style:background-image={fanArtUrl ? `url(${fanArtUrl})` : undefined}
	>
		<button
			onclick={showForm}
			class="absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-950"
			type="button"
			aria-label="Rediger konsert"
		>
			<span class="material-icons text-xl" aria-hidden="true">edit</span>
		</button>
		{#if concertObject.rating}<div class="absolute top-2 left-2 translate-y-9"><StarBox rating={concertObject.rating} /></div>{/if}

		<h2 class="mx-1.5 my-20 rounded-[1.4rem] bg-black/50 p-3 text-center text-2xl text-white capitalize [text-shadow:0_0_2px_black]">{concertObject.artist}</h2>
		{#if concertObject.venue}<div class="absolute bottom-3 left-3 text-white [text-shadow:0_0_2px_black]">@ {concertObject.venue}</div>{/if}
	</div>
	<div class="p-4 text-white">
		{#if bandInfo?.data?.genre}<div><b class="font-bold">Sjanger:</b> {bandInfo?.data?.genre}</div>{/if}
		{#if bandInfo?.data?.country}<div class="mt-2"><b class="font-bold">Fra:</b> {bandInfo?.data?.country}</div>{/if}
		{#if concertObject.festival}<div class="mt-2"><b class="font-bold">Festival:</b> {concertObject.festival}</div>{/if}
		{#if concertObject.price}<div class="mt-2"><b class="font-bold">Pris:</b> {concertObject.price} kr</div>{/if}
		{#if concertObject.date}<div class="mt-2"><b class="font-bold">Dato:</b> {new Date(concertObject.date).toLocaleDateString()}</div>{/if}
		{#if concertObject.note}<div class="mt-4 rounded-xl bg-white/10 p-4">{concertObject.note}</div>{/if}
	</div>
</div>
