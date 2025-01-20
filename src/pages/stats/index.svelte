<script>
import BestVenues from './components/BestVenues/index.svelte'
import TotalCost from './components/TotalCost/index.svelte'
import Select from '../../lib/Select/index.svelte'
import BestLikedBands from './components/BestLikedBands/index.svelte'

const nowYear = new Date().getFullYear()

const years = [...Array(5)].map((_, i) => `${nowYear - i}`)
const options = years.map((year) => ({value: year, title: year}))
let selected = $state(`${nowYear}`)

function handleSelectChange(e) {
	selected = e.target.value
}
</script>

<main>
	<div class="p-3">
		<Select value={selected} options={options} onChange={handleSelectChange} />
	</div>

	<TotalCost year={selected} />
	<BestVenues year={selected} />
	<hr class="m-3" />
	<BestLikedBands />
</main>
