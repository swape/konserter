<script>
import ConcertList from '../frontpage/components/Concertlist/index.svelte'
import InputWithLabel from '../../lib/InputWithLabel/index.svelte'
import {searchedBandName} from '../../myStore.ts'
</script>

<main id="main-content" tabindex="-1">
	<section class="mx-auto p-3 text-white" aria-labelledby="band-search-title">
		<h1 id="band-search-title" class="mb-2 text-center text-3xl text-white">Søk etter band</h1>
		<p class="mb-3 text-center text-sm text-slate-300">Skriv inn navnet på bandet du leter etter.</p>
		<div class="muted-card">
			<InputWithLabel title="Bandnavn" value={$searchedBandName} onkeyup={(value) => ($searchedBandName = value)} />
		</div>
	</section>
	<ConcertList limit={null} artist={$searchedBandName} />
</main>
