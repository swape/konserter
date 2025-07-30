<script>
import {currentPage} from './myStore'
import StartPage from './pages/frontpage/index.svelte'
import NewPage from './pages/new/index.svelte'
import AuthGate from './lib/AuthGate/AuthGate.svelte'
import ListPage from './pages/list/index.svelte'
import StatsPage from './pages/stats/index.svelte'
import BandSearchPage from './pages/bandSearch/index.svelte'
import DeletedPage from './pages/deletedConcert/index.svelte'

let page = $state(null)

function startViewTransition(callback) {
	if (!document?.startViewTransition) {
		callback()
		return
	}
	document.startViewTransition(callback)
}

currentPage.subscribe((value) => {
	startViewTransition(() => {
		page = value
	})
})
</script>

<AuthGate>
	{#if page === 'start'}
		<StartPage />
	{:else if page === 'list'}
		<ListPage />
	{:else if page === 'stats'}
		<StatsPage />
	{:else if page === 'new'}
		<NewPage />
	{:else if page === 'bandSearch'}
		<BandSearchPage />
	{:else if page === 'deletedConcert'}
		<DeletedPage />
	{:else}
		404
	{/if}
</AuthGate>
