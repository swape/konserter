<script>
import {isAuthenticated, signIn} from '../../myStore.ts'
import Header from '../Header/Header.svelte'
</script>

{#if $isAuthenticated}
	<Header />
	<slot />
{/if}
{#if !$isAuthenticated}
	<main class="flex flex-col items-center">
		<img src="/konserter-96.png" alt="konserter logo" class="logo" />
		<button class="button mt-5" onclick={signIn}>Logg inn med Google</button>
	</main>
{/if}
