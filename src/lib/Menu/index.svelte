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

function shorterName(name) {
	const nameList = name.split(' ')
	let last = ''
	if (nameList.length >= 2) {
		const lastList = nameList[1].split('')
		last = ` ${lastList[0]}.`
	}
	return `${nameList[0]}${last}`
}

function initials(name) {
	const nameList = name.split(' ')
	let initials = ''
	if (nameList.length >= 2) {
		initials = `${nameList[0][0]}${nameList[1][0]}`
	} else {
		initials = nameList[0][0]
	}
	return initials
}
</script>

{#if $showMenu}
	<button class="backdrop" onclick={close} type="button"><span class="sr-only">close</span></button>
	<div class="menu">
		<button onclick={close} class="text-slate-900 p-3 text-right fixed top-0 right-0"><span class="material-icons"> cancel </span></button>

		<div class="justify-items-center bg-indigo-900 pt-5 pb-2 flex flex-col gap-1 items-center">
			<div class="rounded-full overflow-hidden w-10 h-10 shadow-slate-800 shadow">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img class="w-full" src={$userObj.img} alt={initials($userObj.name)} />
			</div>
			<h2 class="p-2 truncate text-wrap w-52 text-cyan-50 text-center text-xl my-3">{shorterName($userObj.name)}</h2>
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
	backdrop-filter: blur(8px);
	@apply fixed inset-0;
}
.menu {
	@apply fixed right-0 z-50 top-0 bottom-0 bg-black flex flex-col overflow-auto;
	min-width: 250px;
}

.menu-list li:hover {
	@apply bg-indigo-900 opacity-80;
}

li.active {
	@apply bg-indigo-900 border-l-4 border-t border-gray-900;
}

.menu-list button {
	@apply text-cyan-50 w-full p-3 flex gap-2 text-xl;
}
</style>
