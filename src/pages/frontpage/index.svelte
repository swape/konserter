<script>
import TotalConcerts from './components/TotalConcerts/index.svelte'
import ConcertList from './components/Concertlist/index.svelte'
import { currentPage } from '../../myStore.ts'

function handleSeeMore() {
	$currentPage = 'list'
}
</script>

<main>
	<TotalConcerts />
	<ConcertList limit={3} />
	<div class="flex justify-center">
		<button on:click={() => handleSeeMore()} class="button"> Se mer </button>
	</div>
</main>
