<script>
let {value = null, title = '', type = 'text', postfix = null, onchange = () => {}} = $props()
</script>

<div>
	<div class="text-slate-700 pb-2 dark:text-white">{title}</div>
	{#if !postfix}
		<div>
			<input value={value} {...{type}} class="input" onchange={({target}) => onchange(target.value)} />
		</div>
	{/if}
	{#if postfix}
		<div class="combo">
			<input value={value} {...{type}} class="input" onchange={({target}) => onchange(target.value)} />
			<span>{postfix}</span>
		</div>
	{/if}
</div>
