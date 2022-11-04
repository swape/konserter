<style>
.stats {
  @apply p-4 bg-white text-center text-cyan-600 rounded-md w-full;
}

.stats-wrapper {
  @apply p-3 w-full flex;
}

.stats-number {
  @apply flex justify-center text-4xl text-cyan-900 pt-4;
}

.concert-button {
  @apply truncate mb-1 w-full justify-start;
}
</style>

<script lang="ts">
import { userObj } from '../myStore'
import { syncItems } from '../fire.js'
import { getArtistAndVenue, sortByBestVenue, sortByDate } from '$lib/Concertlist/helper'
import { goto } from '$app/navigation'
import type { ConcertObjectType, ConcertObjectTypeFromFireBase } from '../types'

let concertList : ConcertObjectType[] = []

$: thisYearList = thisYear(concertList)
$: lastYearList = lastYear(concertList)
$: thisYearBestList = thisYearBest(thisYearList)
$: totalSumThisYear = findTotalSumThisYear(thisYearList)
$: sortedVenue = sortByBestVenue(thisYearList)

syncItems(userObj.uid, (data: ConcertObjectTypeFromFireBase) => {
  concertList = Object.values(data).sort(sortByDate)
})

const now = new Date()

const intNoFormat = new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' })
const convertToNoCurrency = (value: number) => intNoFormat.format(value).replace('NOK', 'kr')

function findTotalSumThisYear(concertList: ConcertObjectType[]) {
  let total = 0
  concertList.forEach((item: ConcertObjectType) => {
    total += item.price || 0
  })
  return convertToNoCurrency(total)
}

function thisYear(concertList: ConcertObjectType[]) {
  return concertList.filter((item) => {
    const year = item.date.split('-')[0]
    return parseInt(year, 10) === now.getFullYear()
  })
}

function thisYearBest(concertList: ConcertObjectType[]) {
  return concertList.filter((item) => item.rating > 3)
}

function lastYear(concertList: ConcertObjectType[]) {
  return concertList.filter((item) => {
    const year = item.date.split('-')[0]
    return parseInt(year, 10) === now.getFullYear() - 1
  })
}

function gotoConcert(id: string | undefined) {
  goto(`/new/${id}`)
}
</script>

<div class="stats-wrapper gap-2">
  <div class="stats">
    <div>Konserter i år</div>
    <div class="stats-number">{thisYearList.length}</div>
  </div>

  <div class="stats">
    <div>Konserter i fjor</div>
    <div class="stats-number">{lastYearList.length}</div>
  </div>
</div>

<div class="stats-wrapper">
  <div class="stats">
    <div>Beste konserter i år: {thisYearBestList.length}</div>
    <div>
      <ul class="p-3">
        {#each thisYearBestList as concert}
          <li>
            <button on:click="{() => gotoConcert(concert.id)}" class="button concert-button ">
              <span class="flex items-center">
                <span class="material-icons text-sm">star</span>
                <span>{concert.rating}</span>
              </span>

              <span class="px-2">{concert.date}</span>

              <span class="flex items-center truncate">
                <span class="material-icons text-sm">music_note</span>
                <span class="overflow-ellipsis overflow-hidden truncate">{getArtistAndVenue(concert)}</span>
              </span>
            </button>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>
<div class="stats-wrapper">
  <div class="stats">
    Du brukte {totalSumThisYear} i år på konserter
  </div>
</div>
<div class="stats-wrapper">
  <div class="stats">
    <div class="mb-2">Alle besøkte konsertstedene i år</div>
    {#each sortedVenue as venue}
      <div class="flex justify-between">
        <span class="text-cyan-800 truncate capitalize"
          >{venue[0]}
          :</span
        ><span>{venue[1]}</span>
      </div>
    {/each}
  </div>
</div>
