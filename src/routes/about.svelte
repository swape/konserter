<style>
</style>

<script context="module">
import { browser, dev } from '$app/env'

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement...
export const hydrate = dev

// ...but if the client-side router is already loaded
// (i.e. we came here from elsewhere in the app), use it
export const router = browser

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in prod
export const prerender = true
</script>

<svelte:head>
  <title>About</title>
  <meta name="description" content="About this app" />
</svelte:head>

<section>
  <h1>About this app</h1>
  <div class="box">
    <h2 class="header">With header</h2>
    <p>here is some info here</p>
  </div>
  <div class="box">
    <p>
      Fabio vel iudice vincam, sunt in culpa qui officia. Inmensae subtilitatis, obscuris et malesuada fames. Ambitioni dedisse scripsisse iudicaretur. Nec dubitamus multa iter quae et nos
      invenerat. Petierunt uti sibi concilium totius Galliae in diem certam indicere.
    </p>
  </div>
  <p>info</p>

  <div class="grid grid-cols-3 gap-3 mx-2">
    <button class="button">Test</button>
    <button class="button green">Test</button>
    <button class="button red">Test</button>
  </div>

  <div class="w-fit m-2">
    <div class="grid grid-cols-3 gap-3">
      <button class="button">Test</button>
      <button class="button green">Test</button>
      <button class="button red">Test</button>
    </div>
  </div>

  <div class="grid grid-cols-3 gap-3 m-2">
    <button class="button round">A</button>
    <button class="button green round">AB</button>
    <button class="button red round"><span class="material-icons">face</span></button>
  </div>

  <div class="m-2 flex gap-3 w-fit">
    <button class="button round">A</button>
    <button class="button green round">AB</button>
    <button class="button red round"><span class="material-icons">face</span></button>
  </div>

  <div class="combo m-2">
    <span><span class="material-icons">face</span></span>
    <input type="tel" class="input" />
    <button class="button">Go</button>
  </div>

  <div class="combo m-2">
    <button class="button">Go</button>
    <input type="email" class="input" />
    <button class="button"><span class="material-icons">face</span></button>
  </div>

  <div class="box">
    <div class="combo m-2">
      <button class="button">Go</button>
      <input type="date" class="input" />
    </div>
  </div>

  <div class="combo m-2">
    <input type="datetime-local" class="input" />
    <button class="button">Go</button>
  </div>

  <div class="combo m-2">
    <span>Hei</span>
    <input type="color" class="input" />
  </div>

  <div class="combo m-2">
    <input type="time" class="input" />
    <span>Hei</span>
  </div>

  <div class="m-2 flex justify-between items-center">
    <span class="material-icons">face</span>
    <input type="text" class="input flex-grow ml-2" />
  </div>

  <div class="m-2">
    <textarea class="textarea"></textarea>
  </div>
</section>
