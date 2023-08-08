<script lang="js">
import {concerts} from '../../../../myStore'
import {getMostLikedArtists} from '../../../../helper'

let bands = []

$: {
	concerts.subscribe((data) => {
		bands = getMostLikedArtists(data)
	})
}
</script>

{#if bands.length > 0}
	<div class="stats-wrapper">
		<div class="stats">
			<div class="mb-2">Artister/Band du har sett mest. (alle år)</div>
			{#each bands as band}
				<div class="flex justify-between">
					<span class="text-cyan-800 truncate capitalize">{band[0]}:</span>
					<span>{band[1]}</span>
				</div>
			{/each}
		</div>
	</div>
{/if}
