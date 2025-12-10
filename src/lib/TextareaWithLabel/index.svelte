<script>
let {value, title, onchange = () => {}} = $props()
</script>

<div>
	<div class="text-slate-700 pb-2 dark:bg-gray-900 dark:text-white">{title}</div>
	<div>
		<textarea class="textarea" onkeyup={({target}) => onchange(target.value)}>{value}</textarea>
	</div>
</div>

<style>
@reference "../../app.css";

.textarea {
	@apply box-border appearance-none border rounded-md border-gray-600 px-2 py-2 w-full dark:bg-gray-900 dark:text-white bg-white;
	max-width: 92svw;
	min-width: 200px;
	min-height: 100px;
}

.textarea:focus-visible {
	@apply border-blue-600 outline-none;
}
</style>
