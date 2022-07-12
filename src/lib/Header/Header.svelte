<style>
header {
  position: fixed;
  top:0;
  left:0;
  right:0;
  background-color: rgba(0,0,0,0.85);
  color: white;
  backdrop-filter: blur(40);
}
header > div {
  @apply flex justify-between container mx-auto;
}

.corner {
  @apply p-3;
}
</style>

<script lang="ts">
import { showMenu } from '../../myStore.js'

function openMenu() {
  showMenu.set(true)
}
</script>

<header>
  <div>
    <div class="corner">Logo</div>

    <div class="corner"><button on:click="{openMenu}">Menu</button></div>
  </div>
</header>
