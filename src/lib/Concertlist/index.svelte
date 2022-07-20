<script lang="ts">
    import {userObj} from '../../myStore'
    import {syncItems} from '../../fire.js'
    import {ConcertObjectType} from "../../types";
    import {goto} from '$app/navigation';
    import {sortByDate} from "./helper";
    import {getArtistAndVenue} from "./helper.js";

    let concertList: ConcertObjectType[] = []

    syncItems(userObj.uid, (data: any) => {
        concertList = Object.values(data).sort(sortByDate).filter((_, index) => index < 9)
    })

    function clicked(id: string) {
        goto(`/new/${id}`)
    }
</script>


{#each concertList as concert}
  <button on:click={()=>clicked(concert.id)} class="box">

    <h2 class="header">{getArtistAndVenue(concert)} </h2>

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

