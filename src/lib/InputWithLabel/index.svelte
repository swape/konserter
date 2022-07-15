<script>
export let value = ''
export let title = ''
export let type = 'text'
</script>

<div>
  <div class="text-slate-700 pb-2">{title}</div>
  <div>
    <input bind:value {...{ type }} class="input" />
  </div>
</div>
