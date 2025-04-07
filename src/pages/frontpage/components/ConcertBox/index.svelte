<script>
import {currentConcertItem, currentPage} from '../../../../myStore'
import {getArtistAndVenue} from '../../../../helper'

let {concert} = $props()
function clicked() {
	currentConcertItem.set(concert)
	currentPage.set('new')
}

function getStarColor(rating) {
	const ratingNumber = parseInt(rating, 10)
	const starColor = {
		1: 'text-red-400 opacity-80',
		2: 'text-orange-400 opacity-80',
		3: 'text-yellow-500 opacity-80',
		4: 'text-green-700',
		5: 'text-green-500'
	}

	return starColor[ratingNumber] || 'gray'
}
</script>

<button onclick={() => clicked()} class="box mb-3">
	<span class="block p-3">
		<span class="text-xl">{getArtistAndVenue(concert)}</span>
		<span class="flex justify-between text-sm text-gray-400 items-center">
			{#if concert?.rating}
				<div class="star-box">
					<span class={['flex items-center', getStarColor(concert.rating)].join(' ')}>
						<span class="material-icons">star</span>
						<span>{concert.rating}</span>
					</span>
				</div>
			{/if}

			{#if concert?.festival}
				<div>{concert.festival}</div>
			{/if}

			<small>{concert?.date}</small>
		</span>
	</span>
</button>

<style>
.star-box {
	display: flex;
	align-items: center;
	border-radius: 50px;
	background-color: #23233a;
	padding: 2px 8px;
	font-size: 16px;
}
</style>
