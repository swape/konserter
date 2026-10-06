<script lang="ts">
import {currentConcertItem, currentPage, showMenu, signOut, userObj} from '../../myStore'
import {getMyMenu} from './menuList'
import {shorterName, initials} from './helpers'

const myMenu = getMyMenu()

function close() {
	showMenu.set(false)
}

function isActive(path: string) {
	return $currentPage === path
}

function navigateTo(value: string) {
	$currentPage = value
	$currentConcertItem = null
	showMenu.set(false)
}

function handleSignOut() {
	signOut()
}
</script>

{#if $showMenu}
	<button class="menu-backdrop" onclick={close} type="button" aria-label="Lukk meny"></button>
	<div class="menu-panel" role="dialog" aria-modal="true" aria-label="Brukermeny">
		<button onclick={close} class="menu-close-button" type="button" aria-label="Lukk meny">
			<span class="material-icons" aria-hidden="true"> cancel </span>
		</button>

		<div class="menu-profile">
			<div class="avatar">
				{#if $userObj.img}
					<img class="h-full w-full object-cover" src={$userObj.img} alt="Profilbilde for {shorterName($userObj.name)}" />
				{:else}
					<span aria-hidden="true">{initials($userObj.name)}</span>
				{/if}
			</div>
			<h2>{shorterName($userObj.name)}</h2>
		</div>

		<nav aria-label="Appmeny">
			<ul class="menu-list">
				{#each myMenu as item}
					<li class:active={isActive(item.url)}>
						<button onclick={() => navigateTo(item.url)} type="button" aria-current={isActive(item.url) ? 'page' : undefined}>{item.title}</button>
					</li>
				{/each}
				<li>
					<button onclick={handleSignOut} type="button"><span class="material-icons" aria-hidden="true">logout</span> Logg ut</button>
				</li>
			</ul>
		</nav>
	</div>
{/if}
