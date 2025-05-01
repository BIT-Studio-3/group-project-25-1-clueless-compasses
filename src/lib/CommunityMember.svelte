<script>
    export let resources;

    let resourceItems = []; // Initialize an empty array

    // Use a for loop to create list items
    for (let i = 0; i < resources.length; i++) {
        resourceItems.push({
            title: resources[i].title,
            description: resources[i].description,
            link: resources[i].link
        });
    }
    let fullscreen="smallScreen"
</script>

<section
class={fullscreen === "full" ? "bigScreen" : "smallScreen"}
id={fullscreen === "small" ? "smallScreen" : ""}
>
    <h2>Community Facilities Improvement
        <button
        class="fullscreen-toggle"
        title={fullscreen === "full" ? "Shrink" : "Enlarge"}
        on:click={() => fullscreen == "full" ? (fullscreen = "small") : (fullscreen = "full")} >
        {fullscreen == "full" ? "🔍➖" : "🔍➕"}
      </button>
    </h2>
    <p>As a community board member, here are some resources to help improve facilities after a disaster.</p>
    <ul>
        {#each resourceItems as resource}
            <li>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <a href={resource.link} target="_blank" rel="noopener">Learn more</a>
            </li>
        {/each}
    </ul>
</section>

<style>
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        margin-bottom: 1.5rem; /* Uncomment if needed */
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
    .fullscreen-toggle {
        cursor: pointer;
        background: none;
        border: none;
        font-size: 1em;
        margin-left: 0.5em;
    }
</style>
