<script>
let {value, title, onchange = () => {}} = $props()
</script>

<div>
	<div class="text-slate-700 pb-2 dark:bg-gray-900 dark:text-white">{title}</div>
	<div>
		<textarea class="textarea" onkeyup={({target}) => onchange(target.value)}>{value}</textarea>
	</div>
</div>
