<script>
import {getUniqueId} from '../../helper.ts'

let {value = null, title = '', type = 'text', postfix = null, onchange = () => {}, onkeyup = () => {}} = $props()
let id = getUniqueId(type)
</script>

<label for={id}>
	<div class="text-slate-700 pb-2 dark:text-white">{title}</div>
	{#if !postfix}
		<div>
			<input id={id} value={value} {...{type}} class="input" onchange={({target}) => onchange(target.value)} onkeyup={({target}) => onkeyup(target.value)} />
		</div>
	{/if}
	{#if postfix}
		<div class="combo">
			<input id={id} value={value} {...{type}} class="input" onchange={({target}) => onchange(target.value)} onkeyup={({target}) => onkeyup(target.value)} />
			<span>{postfix}</span>
		</div>
	{/if}
</label>
