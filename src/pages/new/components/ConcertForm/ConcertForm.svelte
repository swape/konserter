<script>
import InputWithLabel from '../../../../lib/InputWithLabel/index.svelte'
import TextareaWithLabel from '../../../../lib/TextareaWithLabel/index.svelte'
import StarRating from '../../../../lib/StarRating/index.svelte'
import {isDataOk} from '../../../../helper'

export let concertObject
export let onSave
export let onClose

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
</script>

<div class="box">
	<h2 class="header">{getHeader()}</h2>
	<div class="grid grid-cols-1 gap-4">
		<InputWithLabel bind:value={concertObject.artist} title="Artist / band" />
		<InputWithLabel bind:value={concertObject.festival} title="Festival" />
		<InputWithLabel bind:value={concertObject.venue} title="Spillested" />
		<InputWithLabel bind:value={concertObject.price} title="Pris" type="tel" postfix="kr" />

		<InputWithLabel bind:value={concertObject.date} title="Dato" type="date" />
		<StarRating bind:value={concertObject.rating} title="Min vurdering" stars={5} />
		<TextareaWithLabel bind:value={concertObject.note} title="Notat" />

		<div class="flex gap-3 justify-between">
			<button class="button" on:click={() => saveForm()}>Lagre</button>
			<button class="button gray" on:click={() => onClose()}>Avbryt</button>
		</div>
	</div>
</div>
