<script lang="ts">
  import {isAuthenticated, signIn} from '../../myStore.js'
</script>

{#if $isAuthenticated}
  <slot />
{/if}
{#if !$isAuthenticated}
  <main>
    <div class="box">
      <h1 class="header">Konserter</h1>
      <div>
        <button class="button" on:click="{signIn}">Logg inn med Google</button>
      </div>
    </div>
  </main>
{/if}
