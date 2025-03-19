<script>
    import { onMount } from "svelte";

    let volcanos = [];

    onMount(async () => {
        const res = await fetch(`https://api.geonet.org.nz/volcano/val`);
        let data = await res.json();
        volcanos = data.features;
    });

    const emojis = {
        Green: "🟩",
        Yellow: "🟨",
        Red: "🟥",
    };

    function getACCStyles(acc) {
        switch (acc) {
            case "Green":
                return { color: "white", backgroundColor: "green" };
            case "Yellow":
                return { color: "black", backgroundColor: "yellow" }; // Changed to black for contrast
            case "Red":
                return { color: "white", backgroundColor: "red" };
            default:
                return { color: "white", backgroundColor: "#333" };
        }
    }

    function getEmoji(acc) {
        return emojis[acc] || "⚪"; // Default emoji for unknown acc
    }
    let fullscreen = "not";
</script>

<section
    class={fullscreen === "full" ? "bigScreen" : "smallScreen"}
    id={fullscreen === "small" ? "smallScreen" : ""}
>
    <button on:click={() => (fullscreen = "full")}>+</button>
    <button on:click={() => (fullscreen = "small")}>-</button>
    <h1>Volcano information</h1>
    <h3>Volcano status by city:</h3>
    {#each volcanos as volcano}
        <details>
            <summary
                >{getEmoji(volcano.properties.acc)}
                {volcano.properties.volcanoTitle}</summary
            >
            <p><strong>Activity:</strong> {volcano.properties.activity}</p>
            <p><strong>Level:</strong> {volcano.properties.level}</p>
            <p><strong>Hazards:</strong> {volcano.properties.hazards}</p>
            <p
                class="ACC"
                style="color: {getACCStyles(volcano.properties.acc)
                    .color}; background-color: {getACCStyles(
                    volcano.properties.acc,
                ).backgroundColor};"
            >
                <strong>ACC:</strong>
                {volcano.properties.acc}
            </p>
        </details>
    {/each}
</section>

<style>
    .ACC {
        width: 100px;
        text-align: center;
        border-radius: 5px;
        padding: 0.1em;
    }
    .bigScreen {
        width: 1000px;
        height: 700px;
    }
    .bigScreen * {
        padding: 0.3rem;
    }
    .bigScreen h1 {
        font-size: 1.5em; 
    }

    .bigScreen h3 {
        font-size: 1.2em; 
    }

    .smallScreen {
        width: 375px;
        height: 375px;
    }
</style>
