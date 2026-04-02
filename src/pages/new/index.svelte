<script lang="ts">
import {userObj, currentPage, currentConcertItem} from '../../myStore'
import {addEntry, updateEntry} from '../../fire'
import {getEmptyConcertItem, isDataOk, toNumber} from '../../helper'
import Feedback from './components/Feedback/Feedback.svelte'
import ConcertForm from './components/ConcertForm/ConcertForm.svelte'
import type {ConcertObjectType} from '../../types'

let concertObject = $state<ConcertObjectType>()
let showFeedBack = $state(false)
let feedbackText = $state('')

// show the current data
currentConcertItem.subscribe((data: ConcertObjectType | null) => {
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

function save(concertValue: ConcertObjectType) {
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
	setFeedBack(concertValue)

	if (concertValue.id) {
		updateEntry(`${$userObj.uid}/${concertValue.id}`, saveObj).finally(() => {
			showFeedBack = true
			$currentConcertItem = null
		})
	} else {
		addEntry(String($userObj.uid), saveObj).finally(() => {
			showFeedBack = true
		})
	}
}

function setFeedBack(data: ConcertObjectType) {
	const {rating, deleted} = data

	if (deleted) {
		feedbackText = 'Konserten er slettet'
	} else if (!rating) {
		feedbackText = 'Konserten er registrert'
	} else if (rating < 3) {
		feedbackText = 'Uffda. Neste konsert kommer til å bli fantastisk'
	} else {
		feedbackText = 'Takk for at du registrerte konserten'
	}
}

function resetData() {
	showFeedBack = false
	concertObject = getEmptyConcertItem()
}
</script>

<main>
	{#if showFeedBack}
		<Feedback resetData={resetData} feedbackText={feedbackText} />
	{/if}
	{#if !showFeedBack}
		<ConcertForm concertObject={concertObject} onSave={save} onClose={close} />
	{/if}
</main>
