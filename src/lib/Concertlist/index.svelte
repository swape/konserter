<script lang="ts">
    import {userObj} from '../../myStore'
    import {syncItems} from '../../fire.js'
    import {ConcertObjectType} from "../../types";
    import {goto} from '$app/navigation';

    let concertList: ConcertObjectType[] = []

    function cleanDateToNumber(value: string): number {
        if (!value.date) {
            return 0
        }
        return parseInt(value.date.replace(/-/g, ''), 10)
    }

    function sortByDate(a, b) {
        const cleanedA = cleanDateToNumber(a)
        const cleanedB = cleanDateToNumber(b)
        return cleanedA < cleanedB ? 1 : -1
    }

    syncItems(userObj.uid, (data: any) => {
        concertList = Object.values(data).sort(sortByDate).filter((_, index) => index < 9)
    })

    function getHeader(concert: ConcertObjectType) {
        return `${concert?.artist}${concert?.venue ? ' @ ' + concert.venue : ''}`
    }

    function clicked(id: string) {
        goto(`/new/${id}`)
    }
</script>


{#each concertList as concert}
    <button on:click={()=>clicked(concert.id)} class="box">

        <h2 class="header">{getHeader(concert)} </h2>
        <div>
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

            <div class="text-sm text-gray-500">{concert.note}</div>
        </div>

    </button>
{/each}

