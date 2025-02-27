<script>
  import Metservice from "$lib/Metservice.svelte";
  import CivilDefence from "$lib/CivilDefence.svelte";
  import GeoNet from "$lib/GeoNet.svelte";
  import Volcano from "$lib/Volcano.svelte";
  import Tides from '$lib/Tides.svelte';
  import CommunityMember from '$lib/CommunityMember.svelte';
  import { load as loadResources } from './CommunityMember/+page.js';
  import AlertsRss from "$lib/AlertsRSS.svelte";
  import Map from "$lib/Map.svelte";
  
  let resources = [];
  let loading = true;
  let error = null;

  (async () => {
      try {
          const data = await loadResources();
          resources = data.resources;
      } catch (err) {
          error = 'Failed to load resources.';
      } finally {
          loading = false; 
      }
  })();
</script>

<main>
  <Metservice />  
  <GeoNet />
  <Volcano />
  <Map />
  <AlertsRss />
  <Tides />
  <CivilDefence /> 
  {#if loading}
      <p>Loading resources...</p>
  {:else if error}
      <p>{error}</p>
  {:else}
      <CommunityMember {resources} />
  {/if}

  <!--More components go below-->


</main>
  
<style>
  main{
    padding-top: 2em;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    
  }
</style>
