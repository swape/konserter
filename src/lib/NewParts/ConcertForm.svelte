<script lang="ts">
import InputWithLabel from '$lib/InputWithLabel/index.svelte'
import TextareaWithLabel from '$lib/TextareaWithLabel/index.svelte'
import StarRating from '$lib/StarRating/index.svelte'
import { ConcertObjectType } from '../../types'
import { cancel, isDataOk } from './helper'
import { page } from '$app/stores'

export let concertObject: ConcertObjectType = null
export let save: (concertObject: ConcertObjectType) => void

function getHeader(page: any) {
  if (page.params.id) {
    return 'Rediger'
  }
  return 'Registrer'
}
</script>

<div class="box">
  <h2 class="header">{getHeader($page)}</h2>
  <div class="grid grid-cols-1 gap-4">
    <InputWithLabel bind:value="{concertObject.artist}" title="Artist / band" />
    <InputWithLabel bind:value="{concertObject.festival}" title="Festival" />
    <InputWithLabel bind:value="{concertObject.venue}" title="Spillested" />
    <InputWithLabel bind:value="{concertObject.price}" title="Pris" type="tel" postfix="kr" />

    <InputWithLabel bind:value="{concertObject.date}" title="Dato" type="date" />
    <StarRating bind:value="{concertObject.rating}" title="Min vurdering" stars="{5}" />
    <TextareaWithLabel bind:value="{concertObject.note}" title="Notat" />

    <div class="flex gap-3 justify-between">
      <button class="button" on:click="{() => save(concertObject)}" disabled="{!isDataOk(concertObject)}">Lagre</button>
      <button class="button gray" on:click="{cancel}">Avbryt</button>
    </div>
  </div>
</div>
