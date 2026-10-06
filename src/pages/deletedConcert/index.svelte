<script>
import ConcertList from '../frontpage/components/Concertlist/index.svelte'
</script>

<main id="main-content" tabindex="-1">
	<h1 class="text-center text-3xl text-white">Slettede konserter</h1>
	<ConcertList limit={null} deleted={true} />
</main>
