<script lang="ts">
import InputWithLabel from '$lib/InputWithLabel/index.svelte'
import TextareaWithLabel from '$lib/TextareaWithLabel/index.svelte'
import StarRating from '$lib/StarRating/index.svelte'

interface concertObjectType {
  date: string
  artist: string
  note: string
  rating: number
  festival: string
}

const nowDate = new Date()
const day = `${nowDate.getDate()}`.padStart(2,0)
const month = `${nowDate.getMonth()}`.padStart(2,0)
const formattedDate = `${nowDate.getFullYear()}-${month}-${day}`
let concertObject: concertObjectType = {
  date: formattedDate,
  artist: '',
  note: '',
  rating: 3,
  festival : ''
}

function save() {
  console.log(concertObject)
}

function cancel(){
  console.log('cancel')
}
</script>

<div>
  <div class="flex gap-4 flex-col p-4">
    <InputWithLabel bind:value="{concertObject.artist}" title="Artist / band" />
    <InputWithLabel bind:value="{concertObject.festival}" title="Festival" />

    <InputWithLabel bind:value="{concertObject.date}" title="Dato" type="date" />
    <StarRating bind:value="{concertObject.rating}" title="Min vurdering" stars="{5}" />
    <TextareaWithLabel bind:value="{concertObject.note}" title="Notat" />

<div class="flex gap-3 justify-between">
  <button class="button" on:click="{save}">Lagre</button>
  <button class="button gray" on:click={cancel}>Avbryt</button>
</div>

  </div>
</div>
