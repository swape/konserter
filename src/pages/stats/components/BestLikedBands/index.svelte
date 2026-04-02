<script lang="ts">
import {concerts, currentPage, searchedBandName} from '../../../../myStore'
import {getMostLikedArtists} from '../../../../helper'
import type {ConcertObjectType} from '../../../../types'

let bands = $state<[string, number][]>([])

concerts.subscribe((data) => {
	bands = getMostLikedArtists(data.filter((item: ConcertObjectType) => !item.deleted)) as [string, number][]
})

function onClickBand(band: [string, number]) {
	$searchedBandName = band[0]
	$currentPage = 'bandSearch'
}
</script>

{#if bands.length > 0}
	<div class="stats-wrapper">
		<div class="stats">
			<div class="mb-2">
				<span class="text-xl">Mest sett Artister/Band</span> <i>({bands.length})</i><br />
				<span class="text-gray-300 pb-4">i alle år</span>
			</div>
			{#each bands as band}
				<div class="flex justify-between">
					<button onclick={() => onClickBand(band)} class="truncate capitalize underline p-1">{band[0]}:</button>
					<span>{band[1]}</span>
				</div>
			{/each}
		</div>
	</div>
{/if}
