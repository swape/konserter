<script>
import {currentConcertItem, currentPage, showMenu, signOut, userObj} from '../../myStore.ts'
import {fly} from 'svelte/transition'
import {getMyMenu} from './menuList'

const myMenu = getMyMenu()

function close() {
	showMenu.set(!$showMenu)
}

function isActive(path) {
	return $currentPage === path
}

function navigateTo(value) {
	$currentPage = value
	$currentConcertItem = null
	showMenu.set(!$showMenu)
}

function handleSignOut() {
	signOut()
}
</script>

{#if $showMenu}
	<div class="backdrop" on:click={close} on:keypress={close} role="none">&nbsp;</div>
	<div class="menu" transition:fly>
		<button on:click={close} class="close-button"><span class="material-icons"> cancel </span></button>

		<div class="avatar-wrapper">
			<div class="rounded-full overflow-hidden w-16">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img class="w-full" src={$userObj.img} alt="user image" />
			</div>
			<h2>Hei {$userObj.name}</h2>
		</div>

		<div>
			<ul class="menu-list">
				{#each myMenu as item}
					<li class:active={isActive(item.url)}>
						<button on:click={() => navigateTo(item.url)}>{item.title}</button>
					</li>
				{/each}
				<li><button on:click={() => handleSignOut()}><span class="material-icons">logout</span> Logg ut</button></li>
			</ul>
		</div>
	</div>
{/if}

<style>
.backdrop {
	background-color: rgba(0, 0, 0, 0.2);
	@apply fixed inset-0;
}
.menu {
	@apply fixed right-0 z-50 top-0 bottom-0 bg-black flex flex-col;
	min-width: 250px;
}

.menu-list li:hover {
	@apply bg-indigo-900 opacity-80;
}

li.active {
	@apply bg-indigo-900 border-l-4 border-amber-50;
}

.menu-list button {
	@apply text-cyan-50 w-full p-2 flex gap-2;
}

.close-button {
	@apply text-slate-900 p-3 text-right fixed top-0 right-0;
}

h2 {
	@apply text-cyan-50 text-center text-2xl my-3;
}

.avatar-wrapper {
	@apply grid grid-cols-1 gap-3 justify-items-center bg-indigo-900 pt-8 pb-4;
}
</style>
