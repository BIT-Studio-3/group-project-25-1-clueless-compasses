<script>
    import { selectedAgency } from "$lib/stores.js";
</script>

<!-- Dropdown to show specific information -->
<select bind:value={$selectedAgency} class="dropdown">
    <option value="All">🌍 All</option>
    <option value="FENZ">🚒 FENZ</option>
    <option value="GeoNet">🌋 GeoNet</option>
    <option value="USAR">🦺 USAR</option>
</select>

<style>
.dropdown {
    padding: 0.6em 1em 0.6em 1em;
    font-family: inherit;
    font-size: inherit;
    font-weight: bolder;
    background-color: #333;
    color: white;
    cursor: pointer;
    outline: none; 
    border-top: 2px solid #535353;
    border-left: 2px solid #535353;
    border-bottom: 2px solid black;
    border-right: 2px solid black;
}

:global(body.dark) .dropdown {
    background-color: white;
    color: #333;
}
</style>
