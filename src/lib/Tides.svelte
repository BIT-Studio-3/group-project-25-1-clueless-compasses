<script>
  import { onMount } from 'svelte';

  let tides = {};
  let values = [];
  let tidePairs = [];
  let selectedForecast = '2 day';
  let loading = true;

  const dateOptions = { weekday: 'short', day: 'numeric', month: 'short' };
  const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Pacific/Auckland' };

//array use for selectedCity
  const cities = [
    { name: "Auckland Harbour", lat: -36.8406, lon: 174.7650 },
    { name: "Tauranga Harbour", lat: -37.6555, lon: 176.1770 },
    { name: "Napier Port", lat: -39.4784, lon: 176.9186 },
    { name: "Wellington Harbour", lat: -41.2834, lon: 174.7790 },
    { name: "Nelson Harbour", lat: -41.2708, lon: 173.2830 },
    { name: "Lyttelton Harbour", lat: -43.6028, lon: 172.7190 },
    { name: "Dunedin Harbour", lat: -45.8788, lon: 170.5080 }
  ];

  //selectedCity takes cities to be used as selectedCity and city in later code
  let selectedCity = cities[6];

  // a function to get tide info for a city from an api 
  async function fetchTides(city) {
    loading = true;
    try {
      const res = await fetch(`https://api.niwa.co.nz/tides/data?lat=${city.lat}&long=${city.lon}&numberOfDays=2&apikey=UcV9ZQdL9GnLtHymRjPsFovznDzAc0xJ`);
      const data = await res.json();
      tides = data;
      values = tides.values || [];
      getTides();
    } catch (error) {
      console.error('Error fetching tides:', error);
    } finally {
      loading = false;
    }
  }


  function getTides() {
    tidePairs = [];
    if (values && values.length > 1) {
      for (let i = 0; i < values.length; i += 2) {
        if (values[i] && values[i + 1]) {
          tidePairs.push([values[i], values[i + 1]]);
        }
      }
    }
  }

  onMount(() => {
    fetchTides(selectedCity);
  });

  function handleCityChange() {
    fetchTides(selectedCity);
  }

  function handleForecastChange(event) {
    selectedForecast = event.target.value;
  }
</script>

<section class="p-4">
  <h1 class="text-xl font-bold mb-2">{selectedCity.name} Tides</h1>

  <!-- City Selector -->
  <label for="city" class="block font-medium">Choose a city:</label>
  <select 
    id="city" 
    bind:value={selectedCity} 
    on:change={handleCityChange}
    class="w-40 p-1 rounded bg-white text-gray-800 text-base border border-gray-300 cursor-pointer mb-4"
  >
    {#each cities as city}
      <option value={city}>{city.name}</option>
    {/each}
  </select>

  <!-- Forecast Length Selector -->
  <select 
    bind:value={selectedForecast} 
    on:change={handleForecastChange}
    class="w-40 p-1 rounded bg-white text-gray-800 text-base border border-gray-300 cursor-pointer mb-4"
  >
    <option value="1 day">1 day forecast</option>
    <option value="2 day">2 day forecast</option>
  </select>

  <!-- Loading Indicator -->
  {#if loading}
    <p class="text-gray-500">Loading tides...</p>
  {:else}
  
    <!-- Tide Data Table -->
    <table class="w-full border-collapse mt-4">
      <thead>
        <tr class="bg-gray-100">
          <th class="px-4 py-2 text-left border-b">Date</th>
          <th class="px-4 py-2 text-left border-b">HIGH</th>
          <th class="px-4 py-2 text-left border-b">LOW</th>
        </tr>
      </thead>
      <tbody>
        {#each tidePairs.slice(0, selectedForecast === '1 day' ? 2 : 4) as pair}
          {#if pair[0] && pair[1]}
            <tr class="hover:bg-gray-50">
              <td class="px-4 py-2 border-b">{new Date(pair[0].time).toLocaleDateString('en-NZ', dateOptions)}</td>
              <td class="px-4 py-2 border-b">
                <div>{new Date(pair[0].time).toLocaleTimeString('en-NZ', timeOptions)}</div>
                <div>{pair[0].value}m</div>
              </td>
              <td class="px-4 py-2 border-b">
                <div>{new Date(pair[1].time).toLocaleTimeString('en-NZ', timeOptions)}</div>
                <div>{pair[1].value}m</div>
              </td>
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>
  {/if}
</section>
