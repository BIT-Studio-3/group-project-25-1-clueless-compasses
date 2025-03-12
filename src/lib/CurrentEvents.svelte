<script>
    import { selectedAgency } from "$lib/stores.js";
    let title="";
    let agency= $selectedAgency;
    switch (agency) {
    case "FENZ":
        title = "Pressing fire emergencies";
        break;
    case "GeoNet":
        title = "Earthquake and geological alerts";
        break;
    case "USAR":
        title = "Urban search and rescue operations";
        break;
    default:
        title = "All emergency incidents";
}


</script>


<section>
    <h2 class= "text-2xl font-bold mb-4 ">{title}</h2>

    
    {#if $selectedAgency === 'FENZ'}
    <div class="space-y-6">
        <div class="border-b pb-4">
            <h3 class="text-lg font-bold mb-2">Dunedin</h3>
    
            <div class="space-y-1">
                <h5 class="text-sm font-bold">House fire in north Dunedin</h5>
                <h5 class="text-sm font-medium underline">Volunteer firefighter instructions</h5>
                <p>- Put out the fire</p>
            </div>
    
            <div class="space-y-1 mt-3">
                <h5 class="text-sm font-bold">Central Dunedin Harvey Norman</h5>
                <h5 class="text-sm font-medium underline">Volunteer firefighter instructions</h5>
                <p>- Put out the fire</p>
            </div>
        </div>
    
        <div>
            <h3 class="text-lg font-bold mb-2">Christchurch</h3>
    
            <div class="space-y-1">
                <h5 class="text-sm font-bold">Cat stuck in tree in Brighton</h5>
                <h5 class="text-sm font-medium underline">Volunteer firefighter instructions</h5>
                <p>- Rescue cat</p>
            </div>
    
            <div class="space-y-1 mt-3">
                <h5 class="text-sm font-bold">Central Christchurch mall fire</h5>
                <h5 class="text-sm font-medium underline">Volunteer firefighter instructions</h5>
                <p>- Put out the fire</p>
            </div>
        </div>
    </div>
{/if}


{#if $selectedAgency === 'GeoNet'}
    <div class="space-y-6">
        <div class="border-b pb-4">
            <h3 class="text-lg font-bold mb-2">Wellington</h3>

            <div class="space-y-1">
                <h5 class="text-sm font-bold">Earthquake near Lower Hutt</h5>
                <h5 class="text-sm font-medium underline">Safety instructions</h5>
                <p>- Drop, cover, and hold</p>
            </div>

            <div class="space-y-1 mt-3">
                <h5 class="text-sm font-bold">Minor tremors in Kapiti Coast</h5>
                <h5 class="text-sm font-medium underline">Safety instructions</h5>
                <p>- Stay alert for aftershocks</p>
            </div>
        </div>

        <div>
            <h3 class="text-lg font-bold mb-2">Christchurch</h3>

            <div class="space-y-1">
                <h5 class="text-sm font-bold">Tsunami warning in Sumner</h5>
                <h5 class="text-sm font-medium underline">Safety instructions</h5>
                <p>- Evacuate to higher ground</p>
            </div>
        </div>
    </div>
{/if}


{#if $selectedAgency === 'USAR'}
    <div class="space-y-6">
        <div class="border-b pb-4">
            <h3 class="text-lg font-bold mb-2">Auckland</h3>

            <div class="space-y-1">
                <h5 class="text-sm font-bold">Building collapse in downtown Auckland</h5>
                <h5 class="text-sm font-medium underline">Rescue team actions</h5>
                <p>- Search for survivors</p>
            </div>
        </div>

        <div>
            <h3 class="text-lg font-bold mb-2">Wellington</h3>

            <div class="space-y-1">
                <h5 class="text-sm font-bold">Flooded streets in Lower Hutt</h5>
                <h5 class="text-sm font-medium underline">Rescue team actions</h5>
                <p>- Assist trapped residents</p>
            </div>
        </div>
    </div>
    
    {/if}
</section>