<script>
import InputWithLabel from '../../../../lib/InputWithLabel/index.svelte'
import TextareaWithLabel from '../../../../lib/TextareaWithLabel/index.svelte'
import StarRating from '../../../../lib/StarRating/index.svelte'
import {isDataOk} from '../../../../helper'
import {concerts} from '../../../../myStore'

export let concertObject
export let onSave
export let onClose
let festivals = []
let venues = []

concerts.subscribe((data) => {
	const countedFestival = data
		.map((item) => item.festival)
		.reduce((acc, curr) => {
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
		.reduce((acc, curr) => {
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
	if (isDataOk(concertObject)) {
		onSave(concertObject)
	} else {
		// TODO: give feed back on not ok
	}
}

function getHeader() {
	if (concertObject?.id) {
		return 'Rediger'
	}
	return 'Registrer'
}
function addFestival(f) {
	concertObject.festival = f
}

function addVenue(v) {
	concertObject.venue = v
}
</script>

<div class="box">
	<h2 class="header">{getHeader()}</h2>
	<div class="grid grid-cols-1 gap-4">
		<InputWithLabel bind:value={concertObject.artist} title="Artist / band" />

		<InputWithLabel bind:value={concertObject.festival} title="Festival" />
		<div class="flex gap-1">
			{#each festivals as f}<button on:click={() => addFestival(f.name)} class="text-xs text-blue-600 border rounded-md p-1">{f.name}</button>{/each}
		</div>

		<InputWithLabel bind:value={concertObject.venue} title="Spillested" />
		<div class="flex gap-1">
			{#each venues as v}<button on:click={() => addVenue(v.name)} class="text-xs text-blue-600 border rounded-md p-1">{v.name}</button>{/each}
		</div>

		<InputWithLabel bind:value={concertObject.price} title="Pris" type="tel" postfix="kr" />

		<InputWithLabel bind:value={concertObject.date} title="Dato" type="date" />
		<StarRating bind:value={concertObject.rating} title="Min vurdering" stars={5} />
		<TextareaWithLabel bind:value={concertObject.note} title="Notat" />

		<div class="flex gap-3 justify-between">
			<button class="button {!isDataOk(concertObject) && 'gray'}" on:click={() => saveForm()} disabled={!isDataOk(concertObject)}>Lagre</button>
			<button class="button gray" on:click={() => onClose()}>Avbryt</button>
		</div>
	</div>
</div>
