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
	<div class="backdrop" onclick={close} role="none">&nbsp;</div>
	<div class="menu" transition:fly>
		<button onclick={close} class="close-button"><span class="material-icons"> cancel </span></button>

		<div class="avatar-wrapper">
			<div class="rounded-full overflow-hidden w-16">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img class="w-full" src={$userObj.img} alt="user image" />
			</div>
			<h2 class="p-2 truncate text-wrap w-52">Hei {$userObj.name} jahskdjhaskdjhakdjhkasjhdkasjdhkjhdskadjdadkaj</h2>
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
	@apply text-cyan-50 w-full p-5 flex gap-2 text-xl;
}

.close-button {
	@apply text-slate-900 p-3 text-right fixed top-0 right-0;
}

h2 {
	@apply text-cyan-50 text-center text-2xl my-3;
}

.avatar-wrapper {
	@apply justify-items-center bg-indigo-900 pt-8 pb-4;
}
</style>
