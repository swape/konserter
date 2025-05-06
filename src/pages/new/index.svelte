<script>
import {userObj, currentPage, currentConcertItem} from '../../myStore'
import {addEntry, updateEntry} from '../../fire.js'
import {getEmptyConcertItem, isDataOk, toNumber} from '../../helper'
import Feedback from './components/Feedback/Feedback.svelte'
import ConcertForm from './components/ConcertForm/ConcertForm.svelte'

let concertObject = $state()
let showFeedBack = $state(false)

// show the current data
currentConcertItem.subscribe((data) => {
	if (data?.id) {
		concertObject = data
	} else {
		concertObject = getEmptyConcertItem()
	}
})

function close() {
	$currentPage = 'start'
	$currentConcertItem = null
}

function save(concertValue) {
	if (!isDataOk(concertValue)) {
		return false
	}
	const saveObj = {
		...concertValue,
		venue: concertValue.venue.trim(),
		artist: concertValue.artist.trim(),
		price: toNumber(concertValue.price) || 0,
		uid: $userObj.uid
	}
	if (concertValue.id) {
		updateEntry(`${$userObj.uid}/${concertValue.id}`, saveObj).finally(() => {
			showFeedBack = true
			$currentConcertItem = null
		})
	} else {
		addEntry($userObj.uid, saveObj).finally(() => {
			showFeedBack = true
		})
	}
}

function resetData() {
	showFeedBack = false
	concertObject = getEmptyConcertItem()
}
</script>

<main>
	{#if showFeedBack}
		<Feedback concertObject={concertObject} resetData={resetData} />
	{/if}
	{#if !showFeedBack}
		<ConcertForm concertObject={concertObject} onSave={save} onClose={close} />
	{/if}
</main>
