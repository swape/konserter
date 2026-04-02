<script lang="ts">
import {searchArtistFromFirebaseByMBID, searchArtistFromMusicBrainz, convertToBandInfo, addArtistInfoToFirebase} from '../../musicBrainz'
import type {BandInfo} from '../../types'

let {mbid = $bindable(), artistName = $bindable(), updateBandInfo} = $props()
let bandInfo = $state<BandInfo | null>(null)
let showAllArtists = $state(false)
let searchedResults = $state<BandInfo[]>([])

$effect(() => {
	searchArtistFromFirebaseByMBID(mbid, (data) => {
		if (data) {
			bandInfo = data
		}
	})
})

function searchAndShowArtists(artistName = '') {
	searchArtistFromMusicBrainz(artistName, true).then((data) => {
		if (data?.length > 0) {
			searchedResults = data.map(convertToBandInfo)
			// console.log('searchedResults', data)
			showAllArtists = true
		}
	})
}

function selectArtist(item: BandInfo) {
	mbid = item.mbid
	bandInfo = item
	showAllArtists = false
	addArtistInfoToFirebase(mbid, item)
	updateBandInfo(item)
}

function confirmThis() {
	const confirmed = confirm('Er du sikker på at du vil fjerne artistinfo? Dette vil ikke slette konserten')
	if (confirmed) {
		bandInfo = null
		updateBandInfo(null)
	}
}
</script>

<div class="mb-2 relative">
	{#if bandInfo}
		<span class="absolute right-0">
			<button onclick={confirmThis}><span class="material-icons">delete</span></button>
		</span>
	{/if}
	{#if bandInfo?.data?.country}
		<div>Opprinnelsesland: {bandInfo?.data?.country}</div>{/if}
	{#if bandInfo?.data?.genre}
		<div>
			Sjanger: {#if bandInfo.data.disambiguation}
				<span class="italic text-sm">({bandInfo.data.disambiguation})</span>
			{/if}
			<span>{bandInfo?.data?.genre}</span>
		</div>
	{/if}

	{#if !bandInfo}
		<div class="mb-3">
			<button class="button gray" onclick={() => searchAndShowArtists(artistName)}> Hent info om {artistName} </button>
		</div>

		<div>
			{#if showAllArtists}
				<div class="mt-2">
					<div class="font-bold">Flere artister med samme navn:</div>
					{#each searchedResults as item}
						<div class="mt-1 box">
							<div>
								<div>
									{item.artist}
									{#if item.data.disambiguation}
										<span class="italic text-sm">({item.data.disambiguation})</span>
									{/if}
								</div>
								<div>
									{#if item.data.type}
										<div>{item.data.type}</div>
									{/if}
									{#if item.data.country}
										<div>Land: {item.data.country}</div>
									{/if}
									{#if item.data.genre}
										<div>Sjanger: {item.data.genre}</div>
									{/if}
								</div>
							</div>
							<div>
								<button class="button small" onclick={() => selectArtist(item)}>Velg denne</button>
							</div>
						</div>
					{/each}
				</div>
				<div class="mt-2">
					<button class="button small gray" onclick={() => (showAllArtists = false)}>Lukk</button>
				</div>
			{/if}
		</div>
	{/if}
</div>
