<script>
import {concerts, isAuthenticated, signIn, userObj} from '../../myStore.ts'
import {onMount} from 'svelte'
import {init, syncItems} from '../../fire.js'
import Header from '../Header/Header.svelte'

onMount(() => {
	init((data) => {
		if (data?.uid) {
			$isAuthenticated = true
			$userObj = data

			// sync items
			syncItems(data.uid, (concertObj) => {
				if (concertObj) {
					$concerts = [...Object.values(concertObj)]
				}
			})
		} else {
			$isAuthenticated = false
		}
	})
})
</script>

{#if $isAuthenticated}
	<Header />
	<slot />
{/if}
{#if !$isAuthenticated}
	<main class="flex flex-col items-center">
		<img src="/konserter-96.png" alt="konserter logo" class="logo" />
		<button class="button mt-5" on:click={signIn}>Logg inn med Google</button>
	</main>
{/if}
