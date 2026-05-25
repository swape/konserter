<script lang="ts">
let {value = 0, title = '', stars = 5, onchange = () => {}} = $props()
let starsList = $derived(Array.from({length: stars}))

function setStar(index = 0) {
	value = index + 1
	onchange(value)
}

function handleKeydown(event: KeyboardEvent) {
	if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
		event.preventDefault()
		if (value < stars) setStar(value)
	} else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
		event.preventDefault()
		if (value > 1) setStar(value - 2)
	} else if (event.key === 'Home') {
		event.preventDefault()
		setStar(0)
	} else if (event.key === 'End') {
		event.preventDefault()
		setStar(stars - 1)
	}
}
</script>

<div>
	<div class="pb-2" id="starrating-label-{title}">{title}: {value}</div>

	<div role="radiogroup" aria-labelledby="starrating-label-{title}" onkeydown={handleKeydown}>
		{#each starsList as _, index}
			<label>
				<input
					type="radio"
					value={index + 1}
					name="starrating-{title}"
					class="sr-only"
					checked={index + 1 === value}
					aria-label="{index + 1} av {stars} stjerner"
					onchange={() => setStar(index)}
				/>
				{#if index + 1 <= value}
					<span class="material-icons text-blue-700 text-4xl" aria-hidden="true"> star_rate </span>
				{:else}
					<span class="material-icons text-slate-500 text-4xl" aria-hidden="true"> star_border </span>
				{/if}
			</label>
		{/each}
	</div>
</div>
