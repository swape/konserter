<script>
import {currentConcertItem, currentPage} from '../../../../myStore'
import {getArtistAndVenue} from '../../../../helper'

let {concert} = $props()
function clicked() {
	currentConcertItem.set(concert)
	currentPage.set('new')
}

function getStarColor(rating) {
	const ratingNumber = Number.parseInt(rating, 10)
	const starColor = {
		1: 'text-red-500',
		2: 'text-orange-500',
		3: 'text-yellow-500',
		4: 'text-blue-500',
		5: 'text-green-500'
	}

	return starColor[ratingNumber] || 'gray'
}
</script>

<button onclick={() => clicked()} class="box mb-2">
	<span class="block p-3">
		<span class="text-[1.1rem]">{getArtistAndVenue(concert)}</span>
		<span class="flex justify-between text-sm text-gray-400 items-center mt-2">
			{#if concert?.rating}
				<div class="star-box">
					<span class={['flex items-center', getStarColor(concert.rating)].join(' ')}>
						<span class="material-icons">star</span>
						<span>{concert.rating}</span>
					</span>
				</div>
			{/if}

			{#if concert?.festival}
				<div class="truncate">{concert.festival}</div>
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
	padding: 2px 8px 2px 4px;
	font-size: 16px;

	.material-icons {
		font-size: 16px;
	}
}
</style>
