<script>
import ConcertList from '../frontpage/components/Concertlist/index.svelte'
</script>

<main>
	<h1 class="text-2xl text-center text-white">Slettede konserter</h1>
	<ConcertList limit={null} deleted={true} />
</main>
