<script>
import {searchArtistFromFirebaseByMBID} from '../../musicBrainz.js'
const {mbid} = $props()
let bandInfo = $state(null)

searchArtistFromFirebaseByMBID(mbid, (data) => {
	if (data) {
		bandInfo = data
	}
})
</script>

<div>
	{#if bandInfo?.data?.country}
		<div>Opprinnelsesland: {bandInfo?.data?.country}</div>{/if}
	{#if bandInfo?.data?.genre}
		<div>Sjanger: {bandInfo?.data?.genre}</div>{/if}
</div>
