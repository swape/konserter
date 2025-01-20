<script>
import {getEmptyConcertItem} from '../../../../helper'
import {currentPage} from '../../../../myStore'

let {concertObject = getEmptyConcertItem(), resetData = null} = $props()

function cancel() {
	$currentPage = 'start'
}

function getFeedBack(rating) {
	if (!rating) {
		return 'Konserten er registrert'
	}
	if (rating < 3) {
		return 'Uffda. Neste konsert kommer til å bli fantastisk'
	}
	return 'Woho enda en superkonsert'
}
</script>

<div class="box">
	<h2 class="header">
		{getFeedBack(concertObject.rating)}
	</h2>

	<div class="flex gap-3 justify-between">
		<button class="button" onclick={resetData}>Registrer ny konsert</button>
		<button class="button gray" onclick={cancel}>Gå til forsiden</button>
	</div>
</div>
