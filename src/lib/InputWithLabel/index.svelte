<script>
import {getUniqueId} from '../../helper.ts'

let {value = null, title = '', type = 'text', postfix = null, onchange = () => {}, onkeyup = () => {}} = $props()
let id = $derived(getUniqueId(type))
</script>

<label for={id}>
	<div class="pb-2 text-black dark:text-white">{title}</div>
	{#if !postfix}
		<div>
			<input id={id} value={value} class="input" {...{type}} onchange={({target}) => onchange(target.value)} onkeyup={({target}) => onkeyup(target.value)} />
		</div>
	{/if}
	{#if postfix}
		<div class="combo">
			<input id={id} value={value} class="input" {...{type}} onchange={({target}) => onchange(target.value)} onkeyup={({target}) => onkeyup(target.value)} />
			<span>{postfix}</span>
		</div>
	{/if}
</label>

<style>
@reference "../../app.css";

.input {
	@apply box-border appearance-none border rounded-md border-gray-600 p-2 w-full dark:bg-gray-900 dark:text-white bg-white;
	max-width: 92svw;
	min-width: 200px;
}

.input:focus-visible {
	@apply border-blue-600 outline-none;
}
</style>
