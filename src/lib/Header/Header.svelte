<style>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.85);
  color: white;
  backdrop-filter: blur(40);
  z-index: 2;
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

<script lang="ts">
import { showMenu } from '../../myStore.js'

function openMenu() {
  showMenu.set(true)
}
</script>

<header>
  <div>
    <div class="corner">
      <img src="konserter-96.png" alt="konserter logo" class="logo" />
    </div>

    <div class="corner"><button on:click="{openMenu}">Menu</button></div>
  </div>
</header>
