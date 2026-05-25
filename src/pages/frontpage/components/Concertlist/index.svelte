<script lang="ts">
import {concerts, userObj} from '../../../../myStore'
import {cleanDateToNumber, getFormattedDate} from '../../../../helper'
import ConcertBox from '../ConcertBox/index.svelte'
import {deleteEntryPathList} from '../../../../fire'
import type {ConcertObjectType} from '../../../../types'

const ARTIST_FILTER_DEBOUNCE_MS = 150
const DELETED_RETENTION_DAYS = 30

let {limit = undefined, artist = undefined, deleted = false} = $props()

let newDate = $state(new Date())
let lastConcertDate = ''
let localArtist = $state<string | undefined>(artist)

$effect(() => {
	const a = artist
	const timer = setTimeout(() => {
		localArtist = a
	}, ARTIST_FILTER_DEBOUNCE_MS)
	return () => clearTimeout(timer)
})

// Side effect: purge deleted concerts older than DELETED_RETENTION_DAYS from DB
$effect(() => {
	if (!deleted) return
	const data = $concerts
	if (!data || data.length === 0) return
	const toDelete = data
		.filter((item) => item.deleted)
		.filter((item) => {
			const date = new Date(item.deletedDate || '')
			return date.getTime() < new Date().getTime() - 1000 * 60 * 60 * 24 * DELETED_RETENTION_DAYS
		})
	if (toDelete.length > 0) {
		const deleteList = toDelete.map((item) => `${$userObj.uid}/${item.id}`)
		deleteEntryPathList(deleteList)
	}
})

const _lists = $derived.by(() => {
	const data = $concerts
	if (!data || data.length === 0) return {future: [] as ConcertObjectType[], past: [] as ConcertObjectType[]}

	const filtered = deleted
		? data.filter((item) => item.deleted)
		: data.filter((item) => !item.deleted)

	const now = cleanDateToNumber(getFormattedDate(newDate)) + 100
	const sorted = filtered.toSorted((a, b) => cleanDateToNumber(b.date) - cleanDateToNumber(a.date))

	let future = sorted.filter((item) => cleanDateToNumber(item?.date) > now)
	let past = sorted.filter((item) => cleanDateToNumber(item?.date) <= now)

	if (localArtist) {
		const lower = localArtist.toLowerCase()
		future = future.filter((item) => item?.artist.toLowerCase().includes(lower))
		past = past.filter((item) => item?.artist.toLowerCase().includes(lower))
	}

	if (limit) {
		future = future.slice().reverse().slice(0, limit)
		past = past.slice(0, limit)
	}

	return {future, past}
})

const futureConcerts = $derived(_lists.future)
const pastConcerts = $derived(_lists.past)

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
