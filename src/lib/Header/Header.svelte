<script lang="ts">
import {currentConcertItem, currentPage, showMenu} from '../../myStore'
import Menu from '../Menu/index.svelte'

function openMenu() {
	showMenu.set(true)
}

function navigateTo(value: string) {
	$currentPage = value
	$currentConcertItem = null
}
</script>

<header>
	<Menu />
	<div class="flex items-center p-4">
		<h1>
			<button onclick={() => navigateTo('start')} class="flex items-center gap-2 min-w-7.5 h-7.5"><img src={'/konserter-96.png'} alt="konserter logo" class="logo" /></button>
		</h1>

		<div>
			<button onclick={() => navigateTo('new')}><span class="material-icons text-blue-100"> add_circle </span></button>
		</div>
		<div><button onclick={openMenu}><span class="material-icons text-3xl"> menu </span></button></div>
	</div>
</header>

<style>
@reference '../../app.css';
button {
	@apply cursor-pointer;
}

header {
	@apply bg-slate-900 fixed top-0 left-0 right-0 z-10 text-white;
}

header > div {
	@apply flex justify-between container mx-auto;
}

.logo {
	width: 42px;
	height: 42px;
	transition: all 0.3s;
	position: absolute;
}

.logo:hover {
	transform: scale(1.2);
}
</style>
