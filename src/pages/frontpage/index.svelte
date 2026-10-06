<script lang="ts">
import TotalConcerts from './components/TotalConcerts/index.svelte'
import ConcertList from './components/Concertlist/index.svelte'
import {currentPage} from '../../myStore'

function handleSeeMore() {
	$currentPage = 'list'
}
</script>

<main id="main-content" tabindex="-1">
	<h1 class="sr-only">Oversikt over konserter</h1>

	<TotalConcerts />
	<ConcertList limit={3} />
	<div class="mt-4 flex justify-center">
		<button onclick={handleSeeMore} class="button" type="button">Se mer</button>
	</div>
</main>
