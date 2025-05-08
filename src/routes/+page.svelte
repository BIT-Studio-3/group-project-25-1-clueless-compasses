<script>
  import Metservice from "$lib/Metservice.svelte";
  import CivilDefence from "$lib/CivilDefence.svelte";
  import GeoNet from "$lib/GeoNet.svelte";
  import Volcano from "$lib/Volcano.svelte";
  import Tides from "$lib/Tides.svelte";
  import CommunityMember from "$lib/CommunityMember.svelte";
  import Map from "$lib/Map.svelte";
  import ContactUs from "$lib/ContactUs.svelte";
  import { selectedAgency } from "$lib/stores.js";
  import CurrentEvents from "$lib/CurrentEvents.svelte";
  import NZTACameras from "$lib/NZTACameras.svelte";
  import RssEmergencyAlerts from "$lib/RSSEmergencyAlerts.svelte";
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  onMount(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No Token Detected, Redirecting to Login Page')
      goto('/login'); 
    }
  });

  export let data;

  const { groupedCameras, fullAlertDetails } = data;

  
</script>

<!-- Drop down for selecting agency specific view -->

<main class="pt-2 flex justify-center flex-wrap gap-10">
  {#if $selectedAgency === "FENZ"}
    <Metservice />
    <RssEmergencyAlerts />
    <ContactUs />
  {:else if $selectedAgency === "GeoNet"}
    <GeoNet />
    <Volcano />
    <CurrentEvents />
    <ContactUs />
  {:else if $selectedAgency === "USAR"}
    <Metservice />
    <GeoNet />
    <Volcano />
    <CurrentEvents />
    <ContactUs />
  {:else}
    <!-- Displays all -->
    <Metservice />
    <GeoNet />
    <Volcano />
    <Map />
    <RssEmergencyAlerts {fullAlertDetails} />
    <Tides />
    <NZTACameras {groupedCameras} />
    <CivilDefence />
    <CommunityMember />
  {/if}
</main>