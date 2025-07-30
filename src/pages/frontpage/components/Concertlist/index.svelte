<script>
import {concerts} from '../../../../myStore'
import {sortByDate, cleanDateToNumber, getFormattedDate} from '../../../../helper'
import ConcertBox from '../ConcertBox/index.svelte'

let {limit = undefined, artist = undefined, deleted = false} = $props()

let futureConcerts = $state([])
let pastConcerts = $state([])
let newDate = $state(new Date())
let lastConcertDate = ''
let localAllData = $state([])
let localArtist = $state('')

function getYear(concertDate) {
	if (!concertDate) {
		return ''
	}
	const lastYear = new Date(lastConcertDate).getFullYear()
	const concertYear = new Date(concertDate).getFullYear()
	const retVal = concertYear !== lastYear ? concertYear : ''
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

function filterAndSort(data, artist) {
	if (!data || data.length === 0) {
		futureConcerts = []
		pastConcerts = []
		return
	}

	if (deleted) {
		data = data.filter((item) => item.deleted)
	} else {
		data = data.filter((item) => !item.deleted)
	}

	const now = cleanDateToNumber(getFormattedDate(newDate)) + 100
	const sorted = data.toSorted()

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
			.filter((item) => item)
		pastConcerts = pastConcerts.map((item, index) => (index < limit ? item : null)).filter((item) => item)
	}
}
</script>

<div class="p-3">
	{#if futureConcerts.length > 0}
		<h2 class="text-2xl text-center text-white">Kommende konserter</h2>
		<div class="flex flex-col gap-4 mt-4">
			{#each futureConcerts as futureConcert}
				<ConcertBox concert={futureConcert} />
			{/each}
		</div>
	{/if}

	<h2 class="text-2xl text-center py-5 text-white">Konserter</h2>
	<div>
		{#each pastConcerts as concert}
			<div class="text-white mb-1">{getYear(concert?.date)}</div>
			<ConcertBox concert={concert} />
		{/each}
	</div>
</div>
