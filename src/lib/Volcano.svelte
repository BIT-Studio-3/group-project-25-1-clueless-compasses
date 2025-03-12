<script>
    import { onMount } from 'svelte';

    let volcanos = [];

    onMount(async () => {
        const res = await fetch(`https://api.geonet.org.nz/volcano/val`);
        let data = await res.json();
        volcanos = data.features;
    });

    //Object of emojis for conversion from colour to emoji used by the getEmoji function
    const emojis = {
            Green: "🟩",
            Yellow: "🟨",
            Red: "🟥",
            Orange:"🟧"
    };

    //Sets a background and text colour of the acc displayed from api
    function getACCStyles(acc) {
        switch (acc) {
            case 'Green':
                return { color: 'white', backgroundColor: 'green' };
            case 'Yellow':
                return { color: 'black', backgroundColor: 'yellow' }; // Changed to black for contrast
            case 'Red':
                return { color: 'white', backgroundColor: 'red' };
            case 'Orange':
            return { color: 'black', backgroundColor: 'Darkorange' }; // Changed to black for contrast
            default:
                return { color: 'white', backgroundColor: '#333' };
            }
        }


    //Using the emojis object to grab the emoji corresponding to the colour 
    function getEmoji(acc) {
        return emojis[acc] || "⚪"; // Default emoji for unknown acc
    }

</script>

<section>
    <h1 class="text-2xl font-bold">Volcano Information</h1>
    <h3 class="text-lg">Volcano status by city:</h3>
    {#each volcanos as volcano}
        <details class="my-2 border rounded-md p-2">
            <summary class="cursor-pointer font-semibold">
                {getEmoji(volcano.properties.acc)} {volcano.properties.volcanoTitle}
            </summary>
            <p><strong>Activity:</strong> {volcano.properties.activity}</p>
            <p><strong>Level:</strong> {volcano.properties.level}</p>
            <p><strong>Hazards:</strong> {volcano.properties.hazards}</p>
            <p class="w-24 text-center rounded-md px-2 py-1 mt-2 {getACCStyles(volcano.properties.acc)}">
                <strong>ACC:</strong> {volcano.properties.acc}
            </p>
        </details>
    {/each}
</section>
