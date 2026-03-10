<script>
import ConcertList from '../frontpage/components/Concertlist/index.svelte'
import InputWithLabel from '../../lib/InputWithLabel/index.svelte'
import {searchedBandName} from '../../myStore.ts'
</script>

<main>
	<div class="container mx-auto p-3 text-white">
		<h1 class="text-2xl text-center mb-2 text-white">Søk etter band</h1>
		<p class="text-center mb-3 text-white text-sm">Skriv inn navnet på bandet du leter etter:</p>
		<div class="p-3 rounded-md shadow-md bg-slate-900">
			<InputWithLabel title="Bandnavn" value={$searchedBandName} onkeyup={(value) => ($searchedBandName = value)} />
		</div>
	</div>
	<ConcertList limit={null} artist={$searchedBandName} />
</main>
