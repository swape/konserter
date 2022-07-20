<script lang="ts">
    import InputWithLabel from '$lib/InputWithLabel/index.svelte'
    import TextareaWithLabel from '$lib/TextareaWithLabel/index.svelte'
    import StarRating from '$lib/StarRating/index.svelte'
    import {userObj} from '../myStore'
    import {addEntry} from '../fire'
    import {ConcertObjectType} from "../types";


    const nowDate = new Date()
    const day = `${nowDate.getDate()}`.padStart(2, '0')
    const month = `${nowDate.getMonth()}`.padStart(2, '0')
    const formattedDate = `${nowDate.getFullYear()}-${month}-${day}`
    let concertObject: ConcertObjectType = {
        date: formattedDate,
        artist: '',
        note: '',
        rating: 3,
        festival: '',
        venue: '',
        price: 0
    }

    let showFeedBack = false

    function save() {
        if (!isDataOk(concertObject)) {
            return false
        }
        const saveObj = {
            ...concertObject,
            price: parseInt(`${concertObject.price}`.replace(/\D/g, ''), 10),
            uid: userObj.uid
        }
        // todo use update instead if we have id
        addEntry(userObj.uid, saveObj).then(() => {
            showFeedBack = true
        }).catch(console.error)
    }

    function cancel() {
        window.location.href = '/'
    }

    function resetData() {
        showFeedBack = false
        concertObject = {
            date: formattedDate,
            artist: '',
            note: '',
            rating: 3,
            festival: '',
            venue: '',
            price: 0
        }
    }

    function isDataOk(item: ConcertObjectType) {
        return !!item.artist.trim() && !!item.date
    }

    function getFeedBack(rating: number) {
        if (rating < 3) {
            return 'Uffda. Neste konsert kommer til å bli fantastisk'
        }
        return 'Woho enda en superkonsert'
    }
</script>

{#if showFeedBack}
    <div class="box">
        <h2 class="header">
            {getFeedBack(concertObject.rating)}
        </h2>

        <div class="flex gap-3 justify-between">
            <button class="button" on:click="{resetData}">Registrer ny konsert</button>
            <button class="button gray" on:click="{cancel}">Gå til forsiden</button>
        </div>
    </div>
{/if}
{#if !showFeedBack}
    <div class="box">
        <h2 class="header">Registrer</h2>
        <div class="grid grid-cols-1 gap-4">
            <InputWithLabel bind:value="{concertObject.artist}" title="Artist / band"/>
            <InputWithLabel bind:value="{concertObject.festival}" title="Festival"/>
            <InputWithLabel bind:value="{concertObject.venue}" title="Spillested"/>
            <InputWithLabel bind:value="{concertObject.price}" title="Pris" type="tel" postfix="kr"/>

            <InputWithLabel bind:value="{concertObject.date}" title="Dato" type="date"/>
            <StarRating bind:value="{concertObject.rating}" title="Min vurdering" stars="{5}"/>
            <TextareaWithLabel bind:value="{concertObject.note}" title="Notat"/>

            <div class="flex gap-3 justify-between">
                <button class="button" on:click="{save}" disabled="{!isDataOk(concertObject)}">Lagre</button>
                <button class="button gray" on:click="{cancel}">Avbryt</button>
            </div>
        </div>
    </div>
{/if}
