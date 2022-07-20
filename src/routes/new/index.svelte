<script lang="ts">
    import {userObj} from '../../myStore'
    import {addEntry} from '../../fire'
    import {ConcertObjectType} from "../../types";
    import Feedback from "$lib/NewParts/Feedback.svelte";
    import ConcertForm from "$lib/NewParts/ConcertForm.svelte";
    import {getFormattedDate, isDataOk, toNumber} from "$lib/NewParts/helper";

    let concertObject: ConcertObjectType = {
        date: getFormattedDate(),
        artist: '',
        note: '',
        rating: 3,
        festival: '',
        venue: '',
        price: null
    }

    let showFeedBack = false

    function save(concertValue: ConcertObjectType) {
        if (!isDataOk(concertValue)) {
            return false
        }
        const saveObj = {
            ...concertValue,
            price: toNumber(concertValue.price) || 0,
            uid: userObj.uid
        }
        addEntry(userObj.uid, saveObj).then(() => {
            showFeedBack = true
        }).catch(console.error)
    }

    function resetData() {
        showFeedBack = false
        concertObject = {
            date: getFormattedDate(),
            artist: '',
            note: '',
            rating: 3,
            festival: '',
            venue: '',
            price: null
        }
    }

</script>

{#if showFeedBack}
  <Feedback concertObject={concertObject} resetData={resetData}/>
{/if}
{#if !showFeedBack}
  <ConcertForm concertObject={concertObject} save={save}/>
{/if}
