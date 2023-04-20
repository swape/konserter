<script>
import {currentConcertItem, currentPage, showMenu} from '../../myStore.ts'
import Menu from '../Menu/index.svelte'

function openMenu() {
	showMenu.set(true)
}

function navigateTo(value) {
	$currentPage = value
	$currentConcertItem = null
}
</script>

<header>
	<Menu />
	<div class="grid grid-cols-3 items-center">
		<div class="corner">
			<button on:click={() => navigateTo('start')}><img src="/static/konserter-96.png" alt="konserter logo" class="logo" /></button>
		</div>
		<div>
			<button on:click={() => navigateTo('new')}><span class="material-icons text-3xl text-blue-100"> add_circle </span></button>
		</div>
		<div class="corner"><button on:click={openMenu}><span class="material-icons"> menu </span></button></div>
	</div>
</header>

<style>
header {
	@apply bg-slate-900 fixed top-0 left-0 right-0 z-10 text-white;
}
header > div {
	@apply flex justify-between container mx-auto;
}

.corner {
	@apply p-4;
}

.logo {
	width: 32px;
	height: 32px;
	transition: all 0.3s;
}
.logo:hover {
	transform: scale(1.2);
}
</style>
