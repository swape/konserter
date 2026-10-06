<script lang="ts">
import type {Snippet} from 'svelte'
import {isAuthenticated, signIn} from '../../myStore'
import Header from '../Header/Header.svelte'
import Menu from '../Menu/index.svelte'
import {initTheAuth} from '../../fire'

let {children}: {children?: Snippet} = $props()

initTheAuth()
</script>

{#if $isAuthenticated}
	<Header />
	<Menu />
	{#if children}{@render children()}{/if}
{/if}

{#if !$isAuthenticated}
	<main id="main-content" tabindex="-1" class="flex flex-col items-center justify-center text-center">
		<img src="/konserter-96.png" alt="Konserter" class="mb-3 h-24 w-24" />
		<h1>Konserter</h1>
		<button class="button mt-5" type="button" onclick={signIn}>Logg inn med Google</button>
	</main>
{/if}
