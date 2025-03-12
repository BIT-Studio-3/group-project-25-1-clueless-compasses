<script>
  import { onMount } from 'svelte';

  let quakes = [];
  let selectedMmi = '1';

  async function fetchQuakes(mmi) {
    const res = await fetch(`https://api.geonet.org.nz/quake?MMI=${mmi}`);
    let data = await res.json();

    // Filters based on the mmi
    quakes = data.features.filter(quake => quake.properties.mmi.toString() === mmi);
  }

  onMount(() => {
    fetchQuakes(selectedMmi);
  });

  // Fetch data when selectedMmi changes
  $: fetchQuakes(selectedMmi);

  const emojis = {
    Green: "🟩",
    Yellow: "🟨",
    Red: "🟥",
    Orange: "🟧"
  };
</script>

<section>
  <h1 class="text-2xl font-bold mb-4">Earthquake Information</h1>

  <select bind:value={selectedMmi} class="p-2 w-fit rounded bg-white text-gray-800 border cursor-pointer">
    <option value="1">{emojis.Green}1 - Unnoticeable</option>
    <option value="2">{emojis.Green}2 - Unnoticeable</option>
    <option value="3">{emojis.Yellow}3 - Weak</option>
    <option value="4">{emojis.Yellow}4 - Light</option>
    <option value="5">{emojis.Orange}5 - Moderate</option>
    <option value="6">{emojis.Orange}6 - Strong</option>
    <option value="7">{emojis.Red}7 - Severe</option>
    <option value="8">{emojis.Red}8 - Extreme</option>
  </select>

  {#each quakes as quake}
    <details class="mt-4 border p-2 rounded shadow-md">
      <summary class="cursor-pointer text-lg font-semibold">{quake.properties.locality}</summary>
      <p><strong>Depth: </strong>{quake.properties.depth.toFixed(2)} km</p>
      <p><strong>Magnitude: </strong>{quake.properties.magnitude.toFixed(2)}</p>
      <p><strong>MMI:</strong> {quake.properties.mmi}</p>
      <small class="text-gray-600"><strong>Time: </strong>{new Date(quake.properties.time).toLocaleString('en-NZ')}</small>
    </details>
  {/each}

  {#if quakes.length === 0}
    <p class="mt-4 text-gray-600">No earthquakes found with MMI equal to {selectedMmi}.</p>
  {/if}
</section>
