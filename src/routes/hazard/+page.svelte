<script>
  import AddressLookup from "../../lib/AddressLookup.svelte";
  import { hazardAddress, searchQuery } from "$lib/stores.js";
  import { onMount } from "svelte";
  import { currentPage } from "$lib/stores.js";

  $currentPage='hazard'

  let relevantDetails = "";
  let agency = "";
  let severity = "";
  let status = "";
  let contactInfo = "";
  let source = "";
  let hazards = [];

  let isFetching = true;
  let isSubmitting = false;
  let error = null;

  const API_URL = import.meta.env.VITE_DEPLOYED_API_URL
    ? `${import.meta.env.VITE_DEPLOYED_API_URL}/api/v1/hazards`
    : "http://localhost:3000/api/v1/hazards";

  onMount(async () => {
    await fetchHazards();
  });

  async function fetchHazards() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const result = await response.json();
      if (Array.isArray(result.data)) {
        hazards = result.data;
      } else {
        error = "Unexpected API format.";
      }
    } catch (err) {
      console.error("Error fetching hazards:", err);
      error = "Failed to load hazards.";
    } finally {
      isFetching = false;
    }
  }

  async function addHazard() {
    if (relevantDetails.trim() === "") return;

    isSubmitting = true;

    const newHazard = {
      relevantDetails,
      address: $hazardAddress,
      agency,
      severity,
      status,
      contactInfo,
      source,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHazard),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      // Reset form
      relevantDetails = "";
      agency = "";
      severity = "";
      status = "";
      contactInfo = "";
      source = "";
      hazardAddress.set("");
      searchQuery.set("");
      error = null;

      // Refetch hazards to refresh list
      await fetchHazards();
    } catch (err) {
      console.error("Failed to submit hazard:", err);
      error = "Failed to submit hazard. Please try again.";
    } finally {
      isSubmitting = false;
    }
  }
</script>

<main class="p-6">
  <h1
    class="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 text-center rounded"
  >
    Reported Hazards
  </h1>

  <div class="flex gap-6 flex-col md:flex-row">
    <!-- Hazard List -->
    <div class="md:w-1/2 p-6 rounded-lg shadow-md border border-gray-300">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">
        Known Hazards and Risks
      </h2>

      {#if isFetching}
        <p class="text-gray-600">Loading hazards...</p>
      {:else if error}
        <p class="text-red-500">{error}</p>
      {:else if hazards.length === 0}
        <p class="text-gray-600">No hazards reported yet.</p>
      {:else}
        {#each hazards as hazard}
          <details class="mb-3 border border-gray-300 rounded-lg p-4">
            <summary class="cursor-pointer text-lg font-medium text-gray-900">
              {hazard.relevantDetails}
            </summary>
            <div class="mt-2 text-gray-700">
              <p>
                <span class="font-semibold">Address:</span>
                {hazard.address}
              </p>
              <p><span class="font-semibold">Agency:</span> {hazard.agency}</p>
              <p>
                <span class="font-semibold">Severity:</span>
                {hazard.severity}
              </p>
              <p><span class="font-semibold">Status:</span> {hazard.status}</p>
              <p>
                <span class="font-semibold">Contact Info:</span>
                {hazard.contactInfo}
              </p>
              <p><span class="font-semibold">Source:</span> {hazard.source}</p>
            </div>
          </details>
        {/each}
      {/if}
    </div>

    <!-- Add New Hazard -->
    <div class="md:w-1/2 p-4 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-3">Log a New Hazard</h2>

      <label class="block mb-3">
        <span class="text-sm font-medium">Agency</span>
        <select
          bind:value={agency}
          class="w-full p-2 border rounded-md bg-white text-gray-800 dark:bg-gray-800 dark:text-white"
        >
          <option value="">All</option>
          <option value="USAR">USAR</option>
          <option value="FENZ">FENZ</option>
          <option value="Geonet">Geonet</option>
        </select>
      </label>

      <label for="address-input-id" class="block mb-3">
        <span class="text-sm font-medium">Approximate Address</span>
      </label>
      <AddressLookup id="address-input-id" bind:value={$hazardAddress} />

      <label class="block mb-3">
        <span class="text-sm font-medium">Severity Level</span>
        <select
          bind:value={severity}
          class="w-full p-2 border rounded-md bg-white text-gray-800 dark:bg-gray-800 dark:text-white"
        >
          <option value="">Select severity</option>
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </label>

      <label class="block mb-3">
        <span class="text-sm font-medium">Status</span>
        <select
          bind:value={status}
          class="w-full p-2 border rounded-md bg-white text-gray-800 dark:bg-gray-800 dark:text-white"
        >
          <option value="">Select status</option>
          <option value="Active">Active</option>
          <option value="Resolved">Resolved</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Under Investigation">Under Investigation</option>
        </select>
      </label>

      <label class="block mb-3">
        <span class="text-sm font-medium">Contact Info</span>
        <input
          type="text"
          bind:value={contactInfo}
          placeholder="Enter phone/email..."
          class="w-full p-2 border rounded-md bg-white text-gray-800 dark:bg-gray-800 dark:text-white"
        />
      </label>

      <label class="block mb-3">
        <span class="text-sm font-medium">Source of info</span>
        <textarea
          bind:value={source}
          placeholder="Enter Source of info here..."
          class="w-full p-2 border rounded-md bg-white text-gray-800 dark:bg-gray-800 dark:text-white "
        ></textarea>
      </label>

      <label class="block mb-3">
        <span class="text-sm font-medium">Relevant Details</span>
        <textarea
          bind:value={relevantDetails}
          placeholder="Enter details here..."
          class="w-full p-2 border rounded-md bg-white text-gray-800 dark:bg-gray-800 dark:text-white"
        ></textarea>
      </label>

      <button
        on:click={addHazard}
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Hazard"}
      </button>

      {#if error}
        <p class="mt-2 text-red-500 text-sm">{error}</p>
      {/if}
    </div>
  </div>
</main>
