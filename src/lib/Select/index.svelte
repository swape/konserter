<script>
let {options = [], onChange = () => {}, value, emptyText = 'Select an option'} = $props()
</script>

<div class="relative w-full">
	<select class="select" onchange={onChange} bind:value={value}>
		{#if value === undefined}<option value={undefined}>{emptyText}</option>{/if}
		{#each options as option}
			<option value={option?.value || option.title}>{option.title}</option>
		{/each}
	</select>
	<span class="material-icons select-caret dark:text-white py-2"> expand_more </span>
</div>

<style>
@import 'tailwindcss';

.select {
	@apply border border-gray-300 block w-full py-3 px-5 rounded-md dark:bg-gray-900 dark:text-white bg-gray-50 text-gray-900;
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
