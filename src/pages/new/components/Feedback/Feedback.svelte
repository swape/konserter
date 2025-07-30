<script>
import {getEmptyConcertItem} from '../../../../helper'
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
	<div class="flex gap-3 justify-between">
		<button class="button" onclick={resetData}>Registrer ny konsert</button>
		<button class="button green" onclick={cancel}>Alle konserter</button>
		<button class="button gray" onclick={deletedListPage}>Slettede konserter</button>
	</div>
</div>
