<script>
export let options = []
export let onChange = () => {}
export let value
export let emptyText = 'Select an option'
</script>

<div class="relative w-full">
	<select class="select dark:bg-gray-900 dark:text-white bg-gray-50 text-gray-900" on:change={onChange} bind:value={value}>
		{#if value === undefined}<option value={undefined}>{emptyText}</option>{/if}
		{#each options as option}
			<option value={option?.value || option.title}>{option.title}</option>
		{/each}
	</select>
	<span class="material-icons select-caret dark:text-white"> expand_more </span>
</div>

<style>
.select {
	@apply border border-gray-300 text-sm rounded-md block w-full py-1.5 px-3;
	appearance: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	outline: transparent;
}
.select:focus {
	@apply border-blue-500;
}
.select-caret {
	@apply absolute right-2 top-1.5 pointer-events-none;
}
</style>
