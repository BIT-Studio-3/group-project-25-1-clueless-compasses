<script>
    export let resources;
</script>

<section>
    
    <h2 class="text-xl font-bold">Community Facilities Improvement</h2>
    <p class="mb-4">As a community board member, here are some resources to help improve facilities after a disaster.</p>
    <ul class="list-none p-0">
        {#each resources as resource}
            <li class="mb-6">
                <h3 class="text-lg font-semibold">{resource.title}</h3>
                <p class="text-gray-700">{resource.description}</p>
                <a href={resource.link} target="_blank" rel="noopener" class="text-blue-600 hover:underline">Learn more</a>
            </li>
        {/each}
    </ul>
</section>
