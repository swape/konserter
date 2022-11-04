<script lang="ts">
import { userObj } from '../../myStore'
import type { ConcertObjectType } from '../../types'
import { getData, updateEntry } from '../../fire.js'
import Feedback from '$lib/NewParts/Feedback.svelte'
import ConcertForm from '$lib/NewParts/ConcertForm.svelte'
import { getEmptyConsertItem, gotoNew, isDataOk, toNumber } from '$lib/NewParts/helper'
import { page } from '$app/stores'

let concertObject = getEmptyConsertItem()

getData(`${userObj.uid}/${$page.params.id}`).then((data: ConcertObjectType) => {
  concertObject = data
})

let showFeedBack = false

function save(concertValue: ConcertObjectType) {
  if (!isDataOk(concertValue)) {
    return false
  }
  const saveObj: ConcertObjectType = {
    ...concertValue,
    venue: concertValue.venue.trim(),
    artist: concertValue.artist.trim(),
    price: toNumber(concertValue.price) || 0,
    uid: userObj.uid
  }
  if (concertValue.id) {
    updateEntry(`${userObj.uid}/${concertValue.id}`, saveObj)
      .then(() => {
        showFeedBack = true
      })
      .catch(console.error)
  }
}

function resetData() {
  showFeedBack = false
  gotoNew()
}
</script>

{#if showFeedBack}
  <Feedback concertObject="{concertObject}" resetData="{resetData}" />
{/if}
{#if !showFeedBack}
  <ConcertForm concertObject="{concertObject}" save="{save}" />
{/if}
