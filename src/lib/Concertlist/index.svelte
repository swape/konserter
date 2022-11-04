<script lang="ts">
import { userObj } from '../../myStore'
import { syncItems } from '../../fire.js'
import type { ConcertObjectType } from '../../types'
import { goto } from '$app/navigation'
import { sortByDate } from './helper'
import { getArtistAndVenue } from './helper.js'

let concertList: ConcertObjectType[] = []

syncItems(userObj.uid, (data: unknown) => {
  concertList = Object.values(data).sort(sortByDate).filter((_, index) => index < 9)
})

function clicked(id: string) {
  goto(`/new/${id}`)
}
</script>

<div class="p-3">
  {#each concertList as concert}
    <button on:click="{() => clicked(concert.id)}" class="box mb-3">
      <div class="text-xl p-3">{getArtistAndVenue(concert)}</div>

      <div class="flex justify-between text-sm text-gray-400 items-center">
        <small>{concert.date}</small>
        {#if concert.festival}
          <div>{concert.festival}</div>
        {/if}
        {#if concert.rating}
          <div class="flex items-center">
            <span class="material-icons">star</span>
            <span>{concert.rating}</span>
          </div>
        {/if}
      </div>

      <div class="text-sm text-gray-500 pt-2">{concert.note}</div>
    </button>
  {/each}
</div>
