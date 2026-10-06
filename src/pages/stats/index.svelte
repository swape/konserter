<script lang="ts">
import BestVenues from './components/BestVenues/index.svelte'
import TotalCost from './components/TotalCost/index.svelte'
import Select from '../../lib/Select/index.svelte'
import BestLikedBands from './components/BestLikedBands/index.svelte'

const nowYear = new Date().getFullYear()

const years = [...Array(5)].map((_, i) => `${nowYear - i}`)
const options = years.map((year) => ({value: year, title: year}))
let selected = $state(`${nowYear}`)

function handleSelectChange(e: Event) {
	const target = e.target as HTMLSelectElement
	selected = target.value
}
</script>

<main id="main-content" tabindex="-1">
	<h1 class="sr-only">Statistikk</h1>

	<div class="p-3">
		<Select title="Velg år" value={selected} options={options} onChange={handleSelectChange} />
	</div>

	<TotalCost year={selected} />
	<BestVenues year={selected} />
	<hr class="m-3 border-white/10" />
	<BestLikedBands />
</main>
