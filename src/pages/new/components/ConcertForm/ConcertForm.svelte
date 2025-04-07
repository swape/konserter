<script>
import InputWithLabel from '../../../../lib/InputWithLabel/index.svelte'
import TextareaWithLabel from '../../../../lib/TextareaWithLabel/index.svelte'
import StarRating from '../../../../lib/StarRating/index.svelte'
import {isDataOk} from '../../../../helper'
import {concerts} from '../../../../myStore'

let {concertObject, onSave, onClose} = $props()

let festivals = $state([])
let venues = $state([])
let localConcertObject = $state({...concertObject})

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

function updateValue(key, value) {
	localConcertObject = {...localConcertObject, [key]: value}
}
</script>

<div class="box">
	<h2 class="header">{getHeader()}</h2>
	<div class="grid grid-cols-1 gap-4">
		<InputWithLabel value={localConcertObject.artist} title="Artist / band" onchange={(artist) => updateValue('artist', artist)} />

		<InputWithLabel value={localConcertObject.festival} title="Festival" onchange={(festival) => updateValue('festival', festival)} />
		<div class="flex gap-1">
			{#each festivals as f}<button onclick={() => updateValue('festival', f.name)} class="text-xs text-blue-600 border rounded-md p-1">{f.name}</button>{/each}
		</div>

		<InputWithLabel value={localConcertObject.venue} title="Spillested" onchange={(venue) => updateValue('venue', venue)} />
		<div class="flex gap-1">
			{#each venues as v}<button onclick={() => updateValue('venue', v.name)} class="text-xs text-blue-600 border rounded-md p-1">{v.name}</button>{/each}
		</div>

		<InputWithLabel value={localConcertObject.price} title="Pris" type="tel" postfix="kr" onchange={(price) => updateValue('price', price)} />

		<InputWithLabel value={localConcertObject.date} title="Dato" type="date" onchange={(date) => updateValue('date', date)} />
		<StarRating value={localConcertObject.rating} title="Min vurdering" stars={5} onchange={(rating) => updateValue('rating', rating)} />
		<TextareaWithLabel value={localConcertObject.note} title="Notat" onchange={(note) => updateValue('note', note)} />

		<div class="flex gap-3 justify-between">
			<button class="button {!isDataOk(localConcertObject) && 'gray'}" onclick={() => saveForm()}>Lagre</button>
			<button class="button gray" onclick={() => onClose()}>Avbryt</button>
		</div>
	</div>
</div>
