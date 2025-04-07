<script lang="js">
import {concerts} from '../../../../myStore'
import {getMostLikedArtists} from '../../../../helper'

let bands = $state([])

concerts.subscribe((data) => {
	bands = getMostLikedArtists(data)
})
</script>

{#if bands.length > 0}
	<div class="stats-wrapper">
		<div class="stats">
			<div class="mb-2">
				<span class="text-xl">Mest sett Artister/Band</span> <i>({bands.length})</i><br />
				<span class="text-gray-500">i alle år</span>
			</div>
			{#each bands as band}
				<div class="flex justify-between">
					<span class="text-cyan-800 truncate capitalize dark:text-white">{band[0]}:</span>
					<span>{band[1]}</span>
				</div>
			{/each}
		</div>
	</div>
{/if}
