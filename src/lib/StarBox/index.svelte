<script>
let {rating = 0} = $props()

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

<div class="star-box">
	<span class={getStarColor(rating)}>
		<span class="material-icons">star</span>
		<span>{rating}</span>
	</span>
</div>

<style>
.star-box {
	corner-shape: squircle;
	border-radius: 50px;
	background-color: #23233a;
	padding: 2px 8px 2px 4px;
	font-size: 16px;
	translate: 0 -36px;

	> span {
		display: flex;
		align-items: center;
		gap: 3px;
	}

	.material-icons {
		font-size: 24px;
	}
}
</style>
