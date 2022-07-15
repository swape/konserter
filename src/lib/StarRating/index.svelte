<script lang="ts">
export let value: string | number = 0
export let title = ''
export let stars = 5

let starsList = Array(stars)

function setStar(index: number) {
  value = index + 1
}
</script>

<div>
  <div class="text-slate-700 pb-2">{title}: {value}</div>

  <div>
    {#each starsList as _, index}
      <label on:change="{() => setStar(index)}">
        <input type="radio" value="{index}" name="starrating" class="hidden" />
        {#if index + 1 <= value} <span class="material-icons text-blue-700 text-4xl"> star_rate </span>{/if}
        {#if index + 1 > value} <span class="material-icons text-slate-500 text-4xl"> star_border </span>{/if}
      </label>
    {/each}
  </div>
</div>
