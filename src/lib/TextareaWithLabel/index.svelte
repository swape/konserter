<script>
export let value = ''
export let title = ''
</script>

<div>
	<div class="text-slate-700 pb-2">{title}</div>
	<div>
		<textarea bind:value={value} class="textarea" />
	</div>
</div>
