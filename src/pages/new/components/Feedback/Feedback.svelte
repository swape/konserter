<script lang="ts">
import {currentPage} from '../../../../myStore'

let {resetData = null, feedbackText = ''} = $props()

function cancel() {
	$currentPage = 'list'
}

function deletedListPage() {
	$currentPage = 'deletedConcert'
}
</script>

<div class="box">
	<h2 class="header">
		{feedbackText}
	</h2>
	<div class="flex flex-wrap gap-1">
		<span><button class="button small" onclick={resetData}>Registrer ny konsert</button></span>
		<span><button class="button green small" onclick={cancel}>Alle konserter</button></span>
		<span><button class="button gray small" onclick={deletedListPage}>Slettede konserter</button></span>
	</div>
</div>
