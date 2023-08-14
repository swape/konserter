<script>
export let value = null
export let title = ''
export let type = 'text'
export let postfix = null
</script>

<div>
	<div class="text-slate-700 pb-2 dark:text-white">{title}</div>
	{#if !postfix}
		<div>
			<input bind:value={value} {...{type}} class="input" />
		</div>
	{/if}
	{#if postfix}
		<div class="combo">
			<input bind:value={value} {...{type}} class="input" />
			<span>{postfix}</span>
		</div>
	{/if}
</div>
