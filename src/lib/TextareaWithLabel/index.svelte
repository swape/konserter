<script lang="ts">
let {value, title, onchange = () => {}} = $props()
</script>

<div>
	<div class=" pb-2">{title}</div>
	<div>
		<textarea class="textarea" onkeyup={({target}) => onchange((target as HTMLTextAreaElement).value)}>{value}</textarea>
	</div>
</div>

<style>
@reference "../../app.css";

.textarea {
	@apply box-border appearance-none border rounded-md border-gray-600 px-2 py-2 w-full;
	max-width: 92svw;
	min-width: 200px;
	min-height: 100px;
}

.textarea:focus-visible {
	@apply border-blue-600 outline-none;
}
</style>
