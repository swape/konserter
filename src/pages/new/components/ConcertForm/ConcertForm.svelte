<script lang="ts">
import InputWithLabel from '../../../../lib/InputWithLabel/index.svelte'
import TextareaWithLabel from '../../../../lib/TextareaWithLabel/index.svelte'
import StarRating from '../../../../lib/StarRating/index.svelte'
import BandInfoBox from '../../../../lib/BandInfoBox/index.svelte'
import {isDataOk, getTopRepeatedValues} from '../../../../helper'
import {concerts} from '../../../../myStore'
import {searchArtistFromFirebase} from '../../../../musicBrainz'
import type {ConcertObjectType} from '../../../../types'
import {untrack} from 'svelte'
import BandInfo from './BandInfoArtwork.svelte'
import {getEmptyConcertItem} from '../../../../helper'

let {concertObject, onSave, onClose} = $props()

const festivals = $derived(getTopRepeatedValues($concerts, 'festival'))
const venues = $derived(getTopRepeatedValues($concerts, 'venue'))
let localConcertObject = $state<ConcertObjectType>(untrack(() => ({...concertObject})))
let showBandInfo = $state(false)

$effect(() => {
	untrack(() => {
		if (concertObject?.id && concertObject?.mbid && localConcertObject?.artist) {
			showBandInfo = true
		}
	})
})

$effect(() => {
	if (!concertObject?.id) {
		showBandInfo = false
		localConcertObject = getEmptyConcertItem()
	}
})

function saveForm() {
	if (isDataOk(localConcertObject)) {
		onSave(localConcertObject)
	}
}

function getHeader() {
	return concertObject?.id ? 'Rediger' : 'Registrer'
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

{#if showBandInfo}
	<BandInfo showForm={() => (showBandInfo = false)} concertObject={concertObject} />
{/if}
{#if !showBandInfo}
	<div class="p-3 text-white">
		<h1 class="pb-8 text-3xl font-bold">{getHeader()} konsert</h1>
		<div class="grid grid-cols-1 gap-4">
			<InputWithLabel value={localConcertObject.artist} title="Artist / band" onchange={(artist: string) => updateValue('artist', artist)} />

			<InputWithLabel value={localConcertObject.festival} title="Festival" onchange={(festival: string) => updateValue('festival', festival)} />
			{#if festivals.length > 0}
				<div class="flex flex-wrap gap-2" aria-label="Vanlige festivaler">
					{#each festivals as f}<button onclick={() => updateValue('festival', f.name)} class="suggestion-chip" type="button">{f.name}</button>{/each}
				</div>
			{/if}

			<InputWithLabel value={localConcertObject.venue} title="Spillested" onchange={(venue: string) => updateValue('venue', venue)} />
			{#if venues.length > 0}
				<div class="flex flex-wrap gap-2" aria-label="Vanlige spillesteder">
					{#each venues as v}<button onclick={() => updateValue('venue', v.name)} class="suggestion-chip" type="button">{v.name}</button>{/each}
				</div>
			{/if}

			<InputWithLabel value={localConcertObject.price} title="Pris" type="tel" postfix="kr" onchange={(price: string) => updateValue('price', price)} />

			<InputWithLabel value={localConcertObject.date} title="Dato" type="date" onchange={(date: string) => updateValue('date', date)} />
			<StarRating value={localConcertObject.rating} title="Min vurdering" stars={5} onchange={(rating: number) => updateValue('rating', rating)} />
			<TextareaWithLabel value={localConcertObject.note} title="Notat" onchange={(note: string) => updateValue('note', note)} />

			{#if localConcertObject.artist}
				<BandInfoBox bind:mbid={localConcertObject.mbid} bind:artistName={localConcertObject.artist} updateBandInfo={updateBandInfo} />
			{/if}

			<div class="flex justify-between gap-3">
				<button class="button" disabled={!isDataOk(localConcertObject)} onclick={saveForm} type="button">Lagre</button>
				<button class="button gray" onclick={onClose} type="button">Avbryt</button>
			</div>
		</div>
	</div>

	{#if localConcertObject.id && !localConcertObject.deleted}
		<div class="mt-8 flex justify-center border-t border-white/10 pt-8"><button class="button red small" onclick={confirmDelete} type="button">Slett</button></div>
	{/if}
	{#if localConcertObject.deleted}
		<div class="mt-4 flex flex-col items-center p-5 text-center">
			<p class="text-sm text-white">Konserten er slettet. Vil du gjenopprette den?</p>
			<span><button class="button small" onclick={unDelete} type="button">Gjenopprett</button></span>
		</div>
	{/if}
{/if}
