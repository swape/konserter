<style>
main {
  @apply m-12;
}
</style>

<script lang="ts">
import { isAuthenticated, signIn } from '../../myStore.js'
</script>

{#if $isAuthenticated}
  <slot />
{/if}
{#if !$isAuthenticated}
  <main>
    <div class="flex gap-2 justify-center">
      <button class="button" on:click="{signIn}">Sign in</button>
      <a href="/" class="button">another button</a>
    </div>
  </main>
{/if}
