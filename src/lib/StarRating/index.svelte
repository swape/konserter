<script>
let {value = 0, title = '', stars = 5, onchange = () => {}} = $props()
let starsList = $derived(Array(stars))

function setStar(index) {
	value = index + 1
	onchange(value)
}
</script>

<div>
	<div class=" pb-2">{title}: {value}</div>

	<div>
		{#each starsList as _, index}
			<label onchange={() => setStar(index)}>
				<input type="radio" value={index} name="starrating" class="hidden" />
				{#if index + 1 <= value}
					<span class="material-icons text-blue-700 text-4xl"> star_rate </span>{/if}
				{#if index + 1 > value}
					<span class="material-icons text-slate-500 text-4xl"> star_border </span>{/if}
			</label>
		{/each}
	</div>
</div>
