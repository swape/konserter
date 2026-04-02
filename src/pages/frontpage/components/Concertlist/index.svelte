<script lang="ts">
import {concerts, userObj} from '../../../../myStore'
import {cleanDateToNumber, getFormattedDate} from '../../../../helper'
import ConcertBox from '../ConcertBox/index.svelte'
import {deleteEntryPathList} from '../../../../fire'
import type {ConcertObjectType} from '../../../../types'

let {limit = undefined, artist = undefined, deleted = false} = $props()

let futureConcerts = $state<ConcertObjectType[]>([])
let pastConcerts = $state<ConcertObjectType[]>([])
let newDate = $state(new Date())
let lastConcertDate = ''
let localAllData = $state<ConcertObjectType[]>([])
let localArtist = $state('')

function getYear(concertDate: string) {
	if (!concertDate) {
		return ''
	}
	const lastYear = new Date(lastConcertDate).getFullYear()
	const concertYear = new Date(concertDate).getFullYear()
	const retVal = concertYear !== lastYear ? concertYear : null

	lastConcertDate = concertDate
	return retVal
}

$effect(() => {
	localArtist = artist
	setTimeout(() => {
		filterAndSort(localAllData, localArtist)
	}, 150)
})

concerts.subscribe((data) => {
	localAllData = data
	filterAndSort(data, artist)
})

function filterAndSort(data: ConcertObjectType[], artist: string | undefined) {
	if (!data || data.length === 0) {
		futureConcerts = []
		pastConcerts = []
		return
	}

	if (deleted) {
		data = data.filter((item) => item.deleted)

		// remove old deleted concerts from DB
		if (data.length > 0) {
			const deleteData = data.filter((item) => {
				const date = new Date(item.deletedDate || '')
				return date.getTime() < new Date().getTime() - 1000 * 60 * 60 * 24 * 30 // older than 30 days
			})
			if (deleteData.length > 0) {
				const deleteList = deleteData.map((item) => `${$userObj.uid}/${item.id}`)

				deleteEntryPathList(deleteList)
			}
		}
	} else {
		data = data.filter((item) => !item.deleted)
	}

	const now = cleanDateToNumber(getFormattedDate(newDate)) + 100
	const sorted = [
		...data.toSorted((a, b) => {
			return cleanDateToNumber(b.date) - cleanDateToNumber(a.date)
		})
	]

	futureConcerts = sorted.filter((item) => cleanDateToNumber(item?.date) > now)
	pastConcerts = sorted.filter((item) => cleanDateToNumber(item?.date) <= now)

	if (artist) {
		const lowerCaseArtist = artist.toLowerCase()
		futureConcerts = futureConcerts.filter((item) => item?.artist.toLowerCase().includes(lowerCaseArtist))
		pastConcerts = pastConcerts.filter((item) => item?.artist.toLowerCase().includes(lowerCaseArtist))
	}

	if (limit) {
		futureConcerts = futureConcerts
			.reverse()
			.map((item, index) => (index < limit ? item : null))
			.filter((item): item is ConcertObjectType => item !== null)
		pastConcerts = pastConcerts.map((item, index) => (index < limit ? item : null)).filter((item): item is ConcertObjectType => item !== null)
	}
}
</script>

<div class="p-3">
	{#if futureConcerts.length > 0}
		<h2 class="text-2xl text-center text-white">Kommende konserter</h2>
		<div class="flex flex-col mt-4">
			{#each futureConcerts as futureConcert}
				<ConcertBox concert={futureConcert} />
			{/each}
		</div>
	{/if}

	<h2 class="text-2xl text-center py-5 text-white">Konserter</h2>
	<div>
		{#each pastConcerts as concert}
			{#if getYear(concert?.date) !== null}
				<div class="text-white mb-1">{concert.date.slice(0, 4)}</div>
			{/if}
			<ConcertBox concert={concert} />
		{/each}
	</div>
</div>
