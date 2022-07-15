<script lang="ts">
import { isAuthenticated, signIn } from '../../myStore.js'
</script>

{#if $isAuthenticated}
  <slot />
{/if}
{#if !$isAuthenticated}
  <main>
    <div>
      <img src="konserter-96.png" alt="konserter logo" class="logo" />
    </div>
    <div>
      <button class="button" on:click="{signIn}">Logg inn med Google</button>
    </div>
  </main>
{/if}
