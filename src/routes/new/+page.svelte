<script lang="ts">
import { userObj } from '../../myStore'
import { addEntry } from '../../fire'
import type { ConcertObjectType } from '../../types'
import Feedback from '$lib/NewParts/Feedback.svelte'
import ConcertForm from '$lib/NewParts/ConcertForm.svelte'
import { getEmptyConsertItem, getFormattedDate, isDataOk, toNumber } from '$lib/NewParts/helper'

let concertObject = getEmptyConsertItem()

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
  addEntry(userObj.uid, saveObj)
    .then(() => {
      showFeedBack = true
    })
    .catch(console.error)
}

function resetData() {
  showFeedBack = false
  concertObject = getEmptyConsertItem()
}
</script>

{#if showFeedBack}
  <Feedback concertObject="{concertObject}" resetData="{resetData}" />
{/if}
{#if !showFeedBack}
  <ConcertForm concertObject="{concertObject}" save="{save}" />
{/if}
