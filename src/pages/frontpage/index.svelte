<script>
import TotalConcerts from './components/TotalConcerts/index.svelte'
import ConcertList from './components/Concertlist/index.svelte'
import {currentPage} from '../../myStore'

function handleSeeMore() {
	$currentPage = 'list'
}
</script>

<main>
	<TotalConcerts />
	<ConcertList limit={3} />
	<div class="flex justify-center mt-2">
		<button onclick={() => handleSeeMore()} class="button"> Se mer </button>
	</div>
</main>
