<script lang="ts">
import {currentConcertItem, currentPage, showMenu} from '../../myStore'

function openMenu() {
	showMenu.set(true)
}

function navigateTo(value: string) {
	$currentPage = value
	$currentConcertItem = null
}
</script>

<header class="app-header">
	<a href="#main-content" class="skip-link">Hopp til innhold</a>
	<div class="app-header-inner">
		<div class="brand">
			<button onclick={() => navigateTo('start')} class="logo-button" type="button" aria-label="Gå til forsiden">
				<img src="/konserter-96.png" alt="" class="logo" aria-hidden="true" />
				<span>Konserter</span>
			</button>
		</div>

		<nav aria-label="Primærnavigasjon" class="header-actions">
			<button onclick={() => navigateTo('new')} type="button" class="icon-button" aria-label="Registrer ny konsert">
				<span class="material-icons text-blue-100" aria-hidden="true"> add_circle </span>
			</button>
			<button onclick={openMenu} type="button" class="icon-button" aria-label="Åpne meny" aria-haspopup="dialog">
				<span class="material-icons text-3xl" aria-hidden="true"> menu </span>
			</button>
		</nav>
	</div>
</header>
