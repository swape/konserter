<script lang="ts">
import { userObj } from '../../myStore'
import { syncItems } from '../../fire.js'

let counter = 0
let concertList = []

syncItems(userObj.uid, (data: any) => {
  concertList = Object.values(data)
  counter = concertList.length
})
</script>

{#if counter}
  <div class="flex justify-center items-center">
    <span class="material-icons">music_note</span>
    {counter} konserter totalt.
  </div>
{/if}
