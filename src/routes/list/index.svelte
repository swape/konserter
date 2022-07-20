<script lang="ts">
    import {userObj} from "../../myStore"
    import {syncItems} from '../../fire.js'
    import {getArtistAndVenue, sortByDate} from "$lib/Concertlist/helper"
    import {goto} from "$app/navigation"


    let concertList = []

    syncItems(userObj.uid, (data: any) => {
        concertList = Object.values(data).sort(sortByDate)
    })

    function gotoConcert(id: string) {
        goto(`/new/${id}`)
    }
</script>
<div>
  <ul>
    {#each concertList as concert}
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
        @apply grid grid-cols-3 bg-slate-900 m-1 p-2 text-sm w-full overflow-clip rounded border text-white;
    }

</style>
