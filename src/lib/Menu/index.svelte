<script>
import {currentConcertItem, currentPage, showMenu, signOut, userObj} from '../../myStore.ts'

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
	<div class="backdrop" onclick={close} role="none">&nbsp;</div>
	<div class="menu">
		<button onclick={close} class="text-slate-900 p-3 text-right fixed top-0 right-0"><span class="material-icons"> cancel </span></button>

		<div class="justify-items-center bg-indigo-900 pt-8 pb-4 flex flex-col gap-2 items-center">
			<div class="rounded-full overflow-hidden w-16">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img class="w-full" src={$userObj.img} alt={$userObj.name} />
			</div>
			<h2 class="p-2 truncate text-wrap w-52 text-cyan-50 text-center text-2xl my-3">{$userObj.name}</h2>
		</div>

		<div>
			<ul class="menu-list">
				{#each myMenu as item}
					<li class:active={isActive(item.url)}>
						<button onclick={() => navigateTo(item.url)}>{item.title}</button>
					</li>
				{/each}
				<li><button onclick={() => handleSignOut()}><span class="material-icons">logout</span> Logg ut</button></li>
			</ul>
		</div>
	</div>
{/if}

<style>
@reference '../../app.css';

.backdrop {
	background-color: rgba(0, 0, 0, 0.4);
	backdrop-filter: blur(6);
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
	@apply bg-indigo-900 border-l-4 border-t border-gray-900;
}

.menu-list button {
	@apply text-cyan-50 w-full p-5 flex gap-2 text-xl;
}
</style>
