<script lang="ts">
  import ConsertList from '$lib/Concertlist/index.svelte'
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="LMS"/>
</svelte:head>

<div class="w-full">
    <div class="grid grid-cols-1 w-full justify-items-center gap-5">
        <ConsertList/>
    </div>
</div>


