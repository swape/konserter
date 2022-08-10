<script>
    import Header from '$lib/Header/Header.svelte'
    import AuthGate from '$lib/AuthGate/AuthGate.svelte'

    import '../app.css'
    import Menu from '../lib/Menu/Menu.svelte'
</script>

<AuthGate>
  <Header/>
  <main>
    <slot/>
    <br>&nbsp;<br>
  </main>
  <Menu/>
</AuthGate>
