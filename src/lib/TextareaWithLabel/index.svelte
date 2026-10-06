<script lang="ts">
import {getUniqueId} from '../../helper'

interface TextareaWithLabelProps {
	value?: string | null
	title?: string
	onchange?: (value: string) => void
}

let {value = '', title = '', onchange = () => {}}: TextareaWithLabelProps = $props()
const id = getUniqueId('textarea')
</script>

<label class="field" for={id}>
	<span class="field-label">{title}</span>
	<textarea id={id} class="textarea" value={value ?? ''} oninput={({target}) => onchange((target as HTMLTextAreaElement).value)}></textarea>
</label>
