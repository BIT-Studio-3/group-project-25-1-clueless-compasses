<!-- <script>
  import { onMount } from 'svelte';

  let weather = {};
  
  const cities = [
    { name: "Auckland", lat: -36.8485, lon: 174.7633 },
    { name: "Hamilton", lat: -37.7870, lon: 175.2793 },
    { name: "Tauranga", lat: -37.6878, lon: 176.1651 },
    { name: "Napier", lat: -39.4928, lon: 176.9120 },
    { name: "Wellington", lat: -41.2865, lon: 174.7762 },
    { name: "Nelson", lat: -41.2706, lon: 173.2840 },
    { name: "Christchurch", lat: -43.5321, lon: 172.6362 },
    { name: "Dunedin", lat: -45.8666, lon: 170.5190 }
  ];
  
  let selectedCity = cities[7].name;
  
  async function fetchWeather(cityName) {
    const city = cities.find(c => c.name === cityName);
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=82336dbf0297a6e4f7502d515fcbad51&units=metric`);
    weather = await res.json();
  }

  onMount(() => {
    fetchWeather(selectedCity);
  });
</script>


<section>
  <h2>Current Weather</h2>
  
  <label for="city">Choose a city:</label>
  <select id="city" bind:value={selectedCity} on:change={() => fetchWeather(selectedCity)}>
    {#each cities as city}
      <option value={city.name}>{city.name}</option>
    {/each}
  </select>
 
  <ul>
    <li><strong>Location: </strong>{weather.name ? weather.name : "No location data"}</li>
    <li><strong>Temperature: </strong>{weather.main?.temp ? `${weather.main.temp} °C` : "No temperature data"}</li>
    <li><strong>Humidity: </strong>{weather.main?.humidity ? `${weather.main.humidity} %` : "No humidity data"}</li>
    <li><strong>Pressure: </strong>{weather.main?.pressure ? `${weather.main.pressure} Pa` : "No pressure data"}</li>
    <li><strong>Windspeed: </strong>{weather.wind?.speed ? `${weather.wind.speed} Knots` : "No wind data"}</li>
    <li><strong>Windspeed Gusts: </strong>{weather.wind?.gust ? `${weather.wind.gust} Knots` : "No gust data"}</li>    
  </ul>
</section>




<style>
    select {
    width: 9.5em; 
    padding: 0.2em; 
    border-radius: 0.2em; 
    background-color: #ffffff; 
    color: #333; 
    font-size: 1em; 
    appearance: none; 
    cursor: pointer; 
}

option {
    cursor: pointer;
}
label{
  font-size: 1.2rem;
}

</style>
 -->
 <script>
  import { onMount } from 'svelte';

  let weather = {};
  
  //array use for selectedCity
  const cities = [
    { name: "Auckland", lat: -36.8485, lon: 174.7633 },
    { name: "Hamilton", lat: -37.7870, lon: 175.2793 },
    { name: "Tauranga", lat: -37.6878, lon: 176.1651 },
    { name: "Napier", lat: -39.4928, lon: 176.9120 },
    { name: "Wellington", lat: -41.2865, lon: 174.7762 },
    { name: "Nelson", lat: -41.2706, lon: 173.2840 },
    { name: "Christchurch", lat: -43.5321, lon: 172.6362 },
    { name: "Dunedin", lat: -45.8666, lon: 170.5190 }
  ];
  
  let selectedCity = cities[7].name;
  
    // a function to get weather info for a city from an api 
  async function fetchWeather(cityName) {
    const city = cities.find(c => c.name === cityName);
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=82336dbf0297a6e4f7502d515fcbad51&units=metric`);
    weather = await res.json();
  }

  onMount(() => {
    fetchWeather(selectedCity);
  });
</script>

<section>
  <h2 class="text-2xl font-bold mb-4">Current Weather</h2>
  
  <label for="city" class="text-lg font-semibold">Choose a city:</label>
  <select id="city" bind:value={selectedCity} on:change={() => fetchWeather(selectedCity)} 
    class="w-fit p-2 mt-2 rounded bg-white text-gray-800 border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
    {#each cities as city}
      <option value={city.name} class="cursor-pointer">{city.name}</option>
    {/each}
  </select>
 
  <ul class="mt-4 space-y-2">
    <li><strong>Location: </strong>{weather.name ? weather.name : "No location data"}</li>
    <li><strong>Temperature: </strong>{weather.main?.temp ? `${weather.main.temp} °C` : "No temperature data"}</li>
    <li><strong>Humidity: </strong>{weather.main?.humidity ? `${weather.main.humidity} %` : "No humidity data"}</li>
    <li><strong>Pressure: </strong>{weather.main?.pressure ? `${weather.main.pressure} Pa` : "No pressure data"}</li>
    <li><strong>Windspeed: </strong>{weather.wind?.speed ? `${weather.wind.speed} Knots` : "No wind data"}</li>
    <li><strong>Windspeed Gusts: </strong>{weather.wind?.gust ? `${weather.wind.gust} Knots` : "No gust data"}</li>    
  </ul>
</section>
