<script>
    import { selectedPage } from "$lib/stores.js";
</script>

<select bind:value={$selectedPage} class="dropdown">
    <option value="Login">Login</option>
    <option value="Home">Home</option>
    <option value="Hazard">Harzard Reporting</option>
    <option value="Contact">Contact Us</option>
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
    