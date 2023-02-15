<script>
import BestVenues from './components/BestVenues/index.svelte'
import TotalCost from './components/TotalCost/index.svelte'
import StatGraph from './components/StatGraph/index.svelte'

const nowYear = new Date().getFullYear()

const years = [...Array(5)].map((_, i) => `${nowYear - i}`)

let selected = '' + nowYear
</script>

<main>
	<div class="p-3">
		<select bind:value={selected} class="button">
			{#each years as year}
				<option value={year}>{year}</option>
			{/each}
		</select>
	</div>

	<TotalCost year={selected} />
	<BestVenues year={selected} />
	<StatGraph year={selected} />
</main>
