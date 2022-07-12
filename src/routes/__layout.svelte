<style>
main,
footer p {
  @apply container mx-auto;
}
main{
  padding-bottom: 90px;
  padding-top: 40px;
}
footer {
  border-top: 1px solid #ccc;
  padding: 5px 20px;
  position: fixed;
  bottom: 0;
  left:0;
  right:0;
  background-color: rgba(255,255,255,0.9);
  backdrop-filter: blur();
}
</style>

<script>
import Header from '$lib/Header/Header.svelte'
import AuthGate from '$lib/AuthGate/AuthGate.svelte'

import '../app.css'
import Menu from '../lib/Menu/Menu.svelte'
</script>

<AuthGate>
  <Header />
  <main>
    <slot />
  </main>
  <Menu />
</AuthGate>

<footer>
  <p>Footer here</p>
</footer>
