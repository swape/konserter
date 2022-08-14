<script lang="ts">
import { ConcertObjectType } from '../../types'
import { cancel } from './helper.js'

export let concertObject: ConcertObjectType = null
export let resetData: () => void = null

function getFeedBack(rating: number) {
  if (rating < 3) {
    return 'Uffda. Neste konsert kommer til å bli fantastisk'
  }
  return 'Woho enda en superkonsert'
}
</script>

<div class="box">
  <h2 class="header">
    {getFeedBack(concertObject.rating)}
  </h2>

  <div class="flex gap-3 justify-between">
    <button class="button" on:click="{resetData}">Registrer ny konsert</button>
    <button class="button gray" on:click="{cancel}">Gå til forsiden</button>
  </div>
</div>
