<script lang="ts">
import InputWithLabel from '../../../../lib/InputWithLabel/index.svelte'
import TextareaWithLabel from '../../../../lib/TextareaWithLabel/index.svelte'
import StarRating from '../../../../lib/StarRating/index.svelte'
import BandInfoBox from '../../../../lib/BandInfoBox/index.svelte'
import {isDataOk} from '../../../../helper'
import {concerts} from '../../../../myStore'
import {searchArtistFromFirebase} from '../../../../musicBrainz'
import type {ConcertObjectType} from '../../../../types'
import {untrack} from 'svelte'

let {concertObject, onSave, onClose} = $props()

let festivals = $state<{name: string; count: number}[]>([])
let venues = $state<{name: string; count: number}[]>([])
let localConcertObject = $state<ConcertObjectType>(untrack(() => ({...concertObject})))

concerts.subscribe((data: ConcertObjectType[]) => {
	const countedFestival = data
		.map((item) => item.festival)
		.reduce((acc: Record<string, number>, curr) => {
			acc[curr] = (acc[curr] || 0) + 1
			return acc
		}, {})

	festivals = Object.entries(countedFestival)
		.map((item) => ({name: item[0], count: item[1]}))
		.filter((item) => item.count > 1 && item.name)
		.sort((a, b) => b.count - a.count)
		.filter((_, index) => index < 5)
	const countedVenue = data
		.map((item) => item.venue)
		.reduce((acc: Record<string, number>, curr) => {
			acc[curr] = (acc[curr] || 0) + 1
			return acc
		}, {})
	venues = Object.entries(countedVenue)
		.map((item) => ({name: item[0], count: item[1]}))
		.filter((item) => item.count > 1 && item.name)
		.sort((a, b) => b.count - a.count)
		.filter((_, index) => index < 5)
})

function saveForm() {
	if (isDataOk(localConcertObject)) {
		onSave(localConcertObject)
	}
}

function getHeader() {
	if (concertObject?.id) {
		return 'Rediger'
	}
	return 'Registrer'
}

function updateValue(key: keyof ConcertObjectType, value: string | number) {
	localConcertObject = {...localConcertObject, [key]: value}

	if (key === 'venue' && localConcertObject.artist && !localConcertObject.mbid) {
		searchArtistFromFirebase(localConcertObject.artist, (data: {mbid?: string} | null) => {
			if (data?.mbid) {
				updateBandInfo(data)
			}
		})
	}
}

function updateBandInfo(info: {mbid?: string} | null) {
	if (!info) {
		localConcertObject = {...localConcertObject, mbid: null}
	} else {
		localConcertObject = {...localConcertObject, mbid: info.mbid}
	}
}

function confirmDelete() {
	if (localConcertObject.id) {
		const confirmed = confirm('Er du sikker på at du vil slette denne konserten?')
		if (confirmed) {
			onSave({...localConcertObject, deleted: true, deletedDate: new Date()})
		}
	}
}

function unDelete() {
	if (localConcertObject.id) {
		onSave({...localConcertObject, deleted: false, deletedDate: null})
	}
}
</script>

<div class="p-3 text-white">
	<h2 class="text-2xl pb-8">{getHeader()}</h2>
	<div class="grid grid-cols-1 gap-4">
		<InputWithLabel value={localConcertObject.artist} title="Artist / band" onchange={(artist: string) => updateValue('artist', artist)} />

		<InputWithLabel value={localConcertObject.festival} title="Festival" onchange={(festival: string) => updateValue('festival', festival)} />
		<div class="flex gap-1">
			{#each festivals as f}<button onclick={() => updateValue('festival', f.name)} class="text-sm text-slate-400 border rounded-md p-1">{f.name}</button>{/each}
		</div>

		<InputWithLabel value={localConcertObject.venue} title="Spillested" onchange={(venue: string) => updateValue('venue', venue)} />
		<div class="flex gap-1">
			{#each venues as v}<button onclick={() => updateValue('venue', v.name)} class="text-sm text-slate-400 border rounded-md p-1">{v.name}</button>{/each}
		</div>

		<InputWithLabel value={localConcertObject.price} title="Pris" type="tel" postfix="kr" onchange={(price: string) => updateValue('price', price)} />

		<InputWithLabel value={localConcertObject.date} title="Dato" type="date" onchange={(date: string) => updateValue('date', date)} />
		<StarRating value={localConcertObject.rating} title="Min vurdering" stars={5} onchange={(rating: number) => updateValue('rating', rating)} />
		<TextareaWithLabel value={localConcertObject.note} title="Notat" onchange={(note: string) => updateValue('note', note)} />

		{#if localConcertObject.artist}
			<BandInfoBox bind:mbid={localConcertObject.mbid} bind:artistName={localConcertObject.artist} updateBandInfo={updateBandInfo} />
		{/if}

		<div class="flex gap-3 justify-between">
			<button class="button {!isDataOk(localConcertObject) && 'gray'}" onclick={() => saveForm()}>Lagre</button>
			<button class="button gray" onclick={() => onClose()}>Avbryt</button>
		</div>
	</div>
</div>

{#if localConcertObject.id && !localConcertObject.deleted}
	<div class="flex justify-center mt-8 pt-8 border-t border-gray-800"><button class="button red small" onclick={confirmDelete}>Slett</button></div>
{/if}
{#if localConcertObject.deleted}
	<div class="mt-4 p-5 text-center content-center items-center flex flex-col">
		<p class="text-white text-sm">Konserten er slettet. Vil du gjenopprette den?</p>
		<span><button class="button small" onclick={unDelete}>Gjenopprett</button></span>
	</div>
{/if}
