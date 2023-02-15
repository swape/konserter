<script lang="js">
import { concerts } from '../../../../myStore'
import { totalSumYear, filterByGivenYear } from '../../../../helper'

export let year = ''

let thisYear = ''
let count = 0

$: {
	concerts.subscribe((data) => {
		thisYear = totalSumYear(data, parseInt(year, 10))
		count = filterByGivenYear(data, parseInt(year, 10)).length
	})
}
</script>

<div class="stats-wrapper">
	<div class="stats">
		{#if count}
			<div>Du brukte <strong>{thisYear}</strong> i {year} på {count} konsert{`${count === 1 ? '' : 'er'}`}.</div>
		{/if}
		{#if count === 0}
			<div>Ingen kontert i {year}?</div>
		{/if}
	</div>
</div>
