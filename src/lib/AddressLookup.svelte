<script>
  import { hazardAddress, searchQuery } from "$lib/stores.js";

  let suggestions = [];
  let debounceTimeout;

  const fetchSuggestions = () => {
    clearTimeout(debounceTimeout); // Reset the timeout if user types again

    debounceTimeout = setTimeout(async () => {
      if ($searchQuery.length < 4) {
        suggestions = [];
        return;
      }

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${$searchQuery}&format=json&addressdetails=1&countrycodes=NZ&limit=5`
      );
      const data = await response.json();

      suggestions = data.map(suggestion => {
        const { house_number, road, suburb, city } = suggestion.address;
        return {
          formattedAddress: `${house_number ? house_number + ' ' : ''}${road ? road + ', ' : ''}${suburb ? suburb + ', ' : ''}${city || ''}`.trim(),
          full_address: suggestion.display_name
        };
      });
    }, 500); // Waits 500ms after last input before fetching
  };

  const selectHazard = (formattedAddress) => {
    suggestions = [];
    hazardAddress.set(formattedAddress);
    searchQuery.set(formattedAddress);
  };
</script>

<input
  type="text"
  bind:value={$searchQuery}
  on:input={fetchSuggestions}
  placeholder="Enter an address"
  aria-label="Search address"
/>

<ul>
  {#each suggestions as suggestion}
    <li on:click={() => selectHazard(suggestion.formattedAddress)}>
      {suggestion.formattedAddress}
    </li>
  {/each}
</ul>

<style>
  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    font-size: 16px;
  }
  ul {
    list-style-type: none;
    padding-left: 0;
  }
  li {
    padding: 5px;
    background: #f4f4f4;
    border: 1px solid #ddd;
    margin-bottom: 2px;
    cursor: pointer;
  }
  li:hover {
    background-color: #f0f0f0;
  }
</style>

