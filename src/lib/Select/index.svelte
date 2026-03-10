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
	<span class="material-icons absolute right-2 top-1.5 pointer-events-none text-white py-2"> expand_more </span>
</div>

<style>
@reference '../../app.css';

.select {
	@apply border border-gray-300 block w-full py-3 px-5 rounded-md bg-slate-900 text-white;
	appearance: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	outline: transparent;
}
.select:focus {
	@apply border-blue-500;
}
</style>
