<script lang="ts">
import { showMenu, signOut, userObj } from '../../myStore.js'
import { fly } from 'svelte/transition'
import { page } from '$app/stores'
import { beforeNavigate } from '$app/navigation'
import { getMyMenu } from './menuList'

const myMenu = getMyMenu()

function close(): void {
  showMenu.set(false)
}

function isActive(path: string, pathname: string): boolean {
  return path === pathname
}

beforeNavigate(() => {
  close()
})
</script>

{#if $showMenu}
  <div class="backdrop-blur-sm fixed inset-0" on:click="{close}" on:keypress="{close}"></div>
  <div class="menu" transition:fly>
    <button on:click="{close}" class="close-button"><span class="material-icons"> cancel </span></button>

    <div class="avatar-wrapper">
      <div class="rounded-full overflow-hidden w-16">
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img class="w-full" src="{userObj.img}" alt="user image" />
      </div>
      <h2>Hei {userObj.name}</h2>
    </div>

    <div>
      <ul class="menu-list">
        <li class:active="{isActive('/', $page.url.pathname)}">
          <a href="/" sveltekit:prefetch>Forsiden</a>
        </li>
        {#each myMenu as item}
          <li class:active="{isActive(item.url, $page.url.pathname)}">
            <a sveltekit:prefetch href="{item.url}">{item.title}</a>
          </li>
        {/each}
        <li><a on:click="{signOut}" href="/#"><span class="material-icons">logout</span> Logg ut</a></li>
      </ul>
    </div>
  </div>
{/if}

<style>
.menu {
  @apply fixed right-0 z-50 top-0 bottom-0 bg-black flex flex-col;
  min-width: 250px;
}

.menu-list li {
  @apply hover:bg-blue-900 hover:opacity-80 mb-1 p-3;
}

li.active {
  @apply bg-blue-900 border-l-4 border-amber-50;
}

.menu-list a {
  @apply text-cyan-50 w-full p-2 flex gap-2;
}

.close-button {
  @apply text-slate-900 p-3 text-right fixed top-0 right-0;
}

h2 {
  @apply text-cyan-50 text-center text-2xl my-3;
}

.avatar-wrapper {
  @apply grid grid-cols-1 gap-3 justify-items-center bg-purple-800 pt-8 pb-4;
}
</style>
