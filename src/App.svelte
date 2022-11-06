<script>
import { currentPage } from './myStore.ts'
import StartPage from './pages/frontpage/index.svelte'
import NewPage from './pages/new/index.svelte'
import AuthGate from './lib/AuthGate/AuthGate.svelte'
import ListPage from './pages/list/index.svelte'
import StatsPage from './pages/stats/index.svelte'
</script>

<AuthGate>
	{#if $currentPage === 'start'}
		<StartPage />
	{:else if $currentPage === 'list'}
		<ListPage />
	{:else if $currentPage === 'stats'}
		<StatsPage />
	{:else if $currentPage === 'new'}
		<NewPage />
	{:else}
		404
	{/if}
</AuthGate>
