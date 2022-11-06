<script>
import { concerts } from '../../../../myStore.ts'
import { countSum, totalSumThisYear } from '../../../../helper'

let thisYear = 0
let allYears = 0

concerts.subscribe((data) => {
	thisYear = totalSumThisYear(data)
	allYears = countSum(data)
})
</script>

<div class="stats-wrapper">
	<div class="stats">
		<div>Du brukte <strong>{thisYear}</strong> i år på konserter</div>
		<div>Du har brukte <strong>{allYears}</strong> total</div>
	</div>
</div>
