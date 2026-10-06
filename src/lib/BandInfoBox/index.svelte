<script lang="ts">
import {searchArtistFromFirebaseByMBID, searchArtistFromMusicBrainz, convertToBandInfo, addArtistInfoToFirebase} from '../../musicBrainz'
import type {BandInfo} from '../../types'

let {mbid = $bindable(), artistName = $bindable(), updateBandInfo} = $props()
let bandInfo = $state<BandInfo | null>(null)
let showAllArtists = $state(false)
let searchedResults = $state<BandInfo[]>([])
let isLoading = $state(false)

$effect(() => {
	searchArtistFromFirebaseByMBID(mbid, (data) => {
		if (data) {
			bandInfo = data
		}
	})
})

function searchAndShowArtists(artistName = '') {
	isLoading = true
	searchArtistFromMusicBrainz(artistName, true)
		.then((data) => {
			searchedResults = data?.length > 0 ? data.map(convertToBandInfo) : []
			showAllArtists = true
		})
		.finally(() => {
			isLoading = false
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

<div class="relative mb-2" aria-busy={isLoading}>
	{#if bandInfo}
		<span class="absolute right-0">
			<button onclick={confirmThis} class="icon-danger" type="button" aria-label="Fjern artistinformasjon">
				<span class="material-icons" aria-hidden="true">delete</span>
			</button>
		</span>
	{/if}
	{#if bandInfo?.data?.country}
		<div>Opprinnelsesland: {bandInfo?.data?.country}</div>{/if}
	{#if bandInfo?.data?.genre}
		<div>
			Sjanger: {#if bandInfo.data.disambiguation}
				<span class="text-sm italic">({bandInfo.data.disambiguation})</span>
			{/if}
			<span>{bandInfo?.data?.genre}</span>
		</div>
	{/if}

	{#if !bandInfo}
		<div class="mb-3">
			<button class="button gray" onclick={() => searchAndShowArtists(artistName)} disabled={isLoading} type="button">
				{isLoading ? 'Henter artistinfo ...' : `Hent info om ${artistName}`}
			</button>
		</div>

		<div>
			{#if showAllArtists}
				<div class="mt-2">
					<div class="font-bold">Flere artister med samme navn:</div>
					{#if searchedResults.length === 0}
						<p class="text-sm text-slate-300">Ingen artistinfo funnet.</p>
					{/if}
					{#each searchedResults as item}
						<div class="box mt-2">
							<div>
								<div>
									{item.artist}
									{#if item.data.disambiguation}
										<span class="text-sm italic">({item.data.disambiguation})</span>
									{/if}
								</div>
								<div class="text-sm text-slate-300">
									{#if item.data.type}<div>{item.data.type}</div>{/if}
									{#if item.data.country}<div>Land: {item.data.country}</div>{/if}
									{#if item.data.genre}<div>Sjanger: {item.data.genre}</div>{/if}
								</div>
							</div>
							<div>
								<button class="button small" onclick={() => selectArtist(item)} type="button">Velg denne</button>
							</div>
						</div>
					{/each}
				</div>
				<div class="mt-2">
					<button class="button small gray" onclick={() => (showAllArtists = false)} type="button">Lukk</button>
				</div>
			{/if}
		</div>
	{/if}
</div>
