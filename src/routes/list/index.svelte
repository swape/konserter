<script lang="ts">
    import {userObj} from "../../myStore"
    import {syncItems} from '../../fire.js'
    import {getArtistAndVenue, sortByDate} from "$lib/Concertlist/helper"
    import {goto} from "$app/navigation"
    import InputWithLabel from "../../lib/InputWithLabel/index.svelte";
    import {ConcertObjectType} from "../../types";

    let filterText = ''

    let concertList = []
    $: thisYearList = filterList(concertList, filterText)


    syncItems(userObj.uid, (data: any) => {
        concertList = Object.values(data).sort(sortByDate)
    })

    function gotoConcert(id: string) {
        goto(`/new/${id}`)
    }

    function isIn(value: string, filterValue: string) {
        return (value.toLocaleLowerCase().search(filterValue.toLocaleLowerCase()) !== -1)
    }

    function filterList(innerConcertList: ConcertObjectType[], filterValue: string) {
        if (filterValue) {
            return innerConcertList.filter((concert: ConcertObjectType) => {
                return isIn(`${concert.rating}`, filterValue) || isIn(concert.date, filterValue) || isIn(concert.artist, filterValue) || isIn(concert.venue, filterValue) || isIn(concert.festival, filterValue)
            })
        }
        return innerConcertList
    }


</script>
<div class="box">

  <div>
    <InputWithLabel title="Filter" bind:value={filterText}/>
    <div class="text-xs mt-2">Resultater: {filteredList.length}</div>
  </div>

  <ul class="p-3">
    {#each filteredList as concert}
      <li>
        <button on:click={()=>gotoConcert(concert.id)}
                class="concert-button">
          <span>{concert.date}</span>
          <span class="flex items-center">
             <span class="material-icons text-sm">star</span>
            <span>{concert.rating}</span>
          </span>
          <span class="overflow-ellipsis overflow-hidden truncate">{getArtistAndVenue(concert)}</span>
        </button>
      </li>
    {/each}
  </ul>
</div>

<style>
    .concert-button {
        @apply grid grid-cols-3 bg-slate-900 my-1 p-2 text-sm w-full overflow-clip rounded text-white;
    }

</style>
