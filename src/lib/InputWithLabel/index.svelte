<script lang="ts">
import {getUniqueId} from '../../helper'

interface InputWithLabelProps {
	value?: string | number | null
	title?: string
	type?: string
	postfix?: string | null
	onchange?: (value: string) => void
	onkeyup?: (value: string) => void
}

let {value = null, title = '', type = 'text', postfix = null, onchange = () => {}, onkeyup = () => {}}: InputWithLabelProps = $props()
const id = getUniqueId('input')
</script>

<label class="field" for={id}>
	<span class="field-label">{title}</span>
	{#if !postfix}
		<input
			id={id}
			value={value ?? ''}
			class="input"
			{...{type}}
			onchange={({target}) => onchange((target as HTMLInputElement).value)}
			onkeyup={({target}) => onkeyup((target as HTMLInputElement).value)}
		/>
	{/if}
	{#if postfix}
		<span class="combo">
			<input
				id={id}
				value={value ?? ''}
				class="input"
				{...{type}}
				onchange={({target}) => onchange((target as HTMLInputElement).value)}
				onkeyup={({target}) => onkeyup((target as HTMLInputElement).value)}
			/>
			<span>{postfix}</span>
		</span>
	{/if}
</label>
