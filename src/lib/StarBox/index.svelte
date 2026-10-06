<script lang="ts">
let {rating = 0} = $props()

function getStarColor(rating: number) {
	const starColor: Record<number, string> = {
		1: 'text-red-500',
		2: 'text-orange-500',
		3: 'text-yellow-500',
		4: 'text-blue-500',
		5: 'text-green-500'
	}

	return starColor[rating] || 'text-gray-500'
}
</script>

<div class="star-box">
	<span class={getStarColor(rating)}>
		<span class="material-icons" aria-hidden="true">star</span>
		<span>{rating}</span>
	</span>
</div>
