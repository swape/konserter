<script lang="ts">
import {getUniqueId} from '../../helper'
import type {SelectProps} from '../../types'

let {options = [], onChange = () => {}, value = $bindable(undefined), emptyText = 'Select an option', title = ''}: SelectProps = $props()
const id = getUniqueId('select')
</script>

<label class="field" for={id}>
	{#if title}<span class="field-label">{title}</span>{/if}
	<span class="relative block w-full">
		<select id={id} class="select" onchange={onChange} bind:value={value} aria-label={title || emptyText}>
			{#if value === undefined}<option value={undefined}>{emptyText}</option>{/if}
			{#each options as option}
				<option value={option?.value || option.title}>{option.title}</option>
			{/each}
		</select>
		<span class="material-icons pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-300" aria-hidden="true"> expand_more </span>
	</span>
</label>
