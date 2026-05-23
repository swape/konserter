<script lang="ts">
import {searchArtistFromFirebaseByMBID} from '../../../../musicBrainz'
import type {BandInfo} from '../../../../types'
import StarBox from '../../../../lib/StarBox/index.svelte'

let {showForm, concertObject} = $props()
let bandInfo: BandInfo | undefined = $state(undefined)
let fanArtUrl = $state('')

$effect(() => {
	if (!bandInfo?.mbid) {
		searchArtistFromFirebaseByMBID(concertObject.mbid, (data) => {
			if (data) {
				bandInfo = data as BandInfo
				if (bandInfo.fanartData) {
					fanArtUrl = bandInfo.fanartData
				}
			}
		})
	}
})
</script>

<div>
	<div class="band-wrapper" style={fanArtUrl ? `background-image: url(${fanArtUrl})` : ''}>
		<button onclick={showForm} class="text-sm text-gray-400 mb-2 edit-button">
			<span class="material-icons">edit</span>
		</button>
		{#if concertObject.rating}<div class="rating"><StarBox rating={concertObject.rating} /></div>{/if}

		<h2 class="text-2xl text-white capitalize text-center band-name">{concertObject.artist}</h2>
		{#if concertObject.venue}<div class="venue">@ {concertObject.venue}</div>{/if}
	</div>
	<div class="p-4 text-white">
		{#if bandInfo?.data?.genre}<div><b class="font-bold">Sjanger:</b> {bandInfo?.data?.genre}</div>{/if}
		{#if bandInfo?.data?.country}<div class="mt-2"><b class="font-bold">Fra:</b> {bandInfo?.data?.country}</div>{/if}
		{#if concertObject.festival}<div class="mt-2"><b class="font-bold">Festival:</b> {concertObject.festival}</div>{/if}
		{#if concertObject.price}<div class="mt-2"><b class="font-bold">Pris:</b> {concertObject.price} kr</div>{/if}
		{#if concertObject.date}<div class="mt-2"><b class="font-bold">Dato:</b> {new Date(concertObject.date).toLocaleDateString()}</div>{/if}
		{#if concertObject.note}<div class="note">{concertObject.note}</div>{/if}
	</div>
</div>

<style>
.band-wrapper {
	position: relative;
	background: linear-gradient(to right, #05009d, #439a05);
	overflow: hidden;
	border-radius: 8px;
	margin-inline: 1rem;
	background-size: cover;
}
.note {
	margin-top: 1rem;
	padding: 1rem;
	background-color: rgba(255, 255, 255, 0.1);
	border-radius: 4px;
}
.rating {
	position: absolute;
	top: 0.5rem;
	left: 0.5rem;
	translate: 0 36px;
}
.venue {
	position: absolute;
	bottom: 0.5rem;
	left: 0.5rem;
	text-shadow: 0 0 2px black;
	color: white;
}
.band-name {
	text-shadow: 0 0 2px black;
	margin-block: 5rem;
	background-color: rgba(0, 0, 0, 0.4);
	padding: 12px;
	corner-shape: squircle;
	border-radius: 1.4rem;
	margin-inline: 0.4rem;
}
.edit-button {
	position: absolute;
	top: 0.5rem;
	right: 0.5rem;
	padding: 0.25rem;
	border-radius: 34px;
	background-color: white;
	width: 32px;
	height: 32px;
	span {
		font-size: 16px;
	}
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
