<script>
  import Metservice from "$lib/Metservice.svelte";
  import CivilDefence from "$lib/CivilDefence.svelte";
  import GeoNet from "$lib/GeoNet.svelte";
  import Volcano from "$lib/Volcano.svelte";
  import Tides from "$lib/Tides.svelte";
  import CommunityMember from "$lib/CommunityMember.svelte";
  import { load as loadResources } from "./CommunityMember/+page.js";
  import AlertsRss from "$lib/AlertsRSS.svelte";
  import Map from "$lib/Map.svelte";
  import { selectedAgency } from '$lib/stores.js';
  import CurrentEvents from "../lib/CurrentEvents.svelte";

  let resources = [];
  let loading = true;
  let error = null;

  (async () => {
    try {
      const data = await loadResources();
      resources = data.resources;
    } catch (err) {
      error = "Failed to load resources.";
    } finally {
      loading = false;
    }
  })();
</script>

<!-- Drop down for selecting agency specific view -->

<main class="pt-2 flex justify-center flex-wrap gap-10">
  
  {#if $selectedAgency === "FENZ"}
    <Metservice />
    <AlertsRss />
    <CurrentEvents />
  {:else if $selectedAgency === "GeoNet"}
    <GeoNet />
    <Volcano />
    <CurrentEvents />
  {:else if $selectedAgency === "USAR"}
    <Metservice />
    <GeoNet />
    <Volcano />
    <CurrentEvents />
  {:else}
    <!-- Displays all -->
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
  {/if}
</main>

