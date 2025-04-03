<script> 
    import AddressLookup from "../../lib/AddressLookup.svelte";
    import { hazardAddress, searchQuery } from '$lib/stores.js';

    let entry = "";
    let address = "";
    let agency = "";
    let severity = "";
    let status = "";
    let contactInfo = "";
    let hazards = [];

    function addHazard() {
        if (entry.trim() !== "") {
            hazards = [
                {
                    entry: entry,
                    address: $hazardAddress, 
                    agency: agency,
                    severity: severity,
                    status: status,
                    contactInfo: contactInfo
                },
                ...hazards
            ];
            entry = ""; 
            address = ""; 
            agency = "";
            severity = "";
            status = "";
            contactInfo = "";
            hazardAddress.set(""); 
            searchQuery.set("");
        }
    }
</script>

<main class="p-6">
    <h1 class="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 text-center">Reported Hazards</h1>

    <div class="flex gap-6">
        <!-- Known Hazards -->
        <div class="w-1/2 p-6 bg-white rounded-lg shadow-md border border-gray-300">
            <h1 class="text-2xl font-semibold mb-4 text-gray-800">Known Hazards and Risks</h1>
            {#each hazards as hazard}
                <details class="mb-3 border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <summary class="cursor-pointer text-lg font-medium text-gray-900">
                        {hazard.entry}
                    </summary>
                    <div class="mt-2 text-gray-700">
                        <p><span class="font-semibold">Address:</span> {hazard.address}</p>
                        <p><span class="font-semibold">Agency:</span> {hazard.agency}</p>
                        <p><span class="font-semibold">Severity:</span> {hazard.severity}</p>
                        <p><span class="font-semibold">Status:</span> {hazard.status}</p>
                        <p><span class="font-semibold">Contact Info:</span> {hazard.contactInfo}</p>
                    </div>
                </details>
            {/each}
        </div>

        <!-- Log New Hazard -->
        <div class="w-1/2 p-4 bg-gray-50 rounded-lg shadow-md">
            <h1 class="text-lg font-semibold mb-3">Log a New Hazard</h1>

            <label class="block mb-3">
                <span class="text-sm font-medium">Agency</span>
                <select bind:value={agency} class="w-full p-2 border rounded-md">
                    <option value="">All</option>
                    <option value="USAR">USAR</option>
                    <option value="FENZ">FENZ</option>
                    <option value="Geonet">Geonet</option>
                </select>
            </label>

            <label class="block mb-3">
                <span class="text-sm font-medium">Approximate Address</span>
                <AddressLookup bind:value={$hazardAddress} />
            </label>

            <label class="block mb-3">
                <span class="text-sm font-medium">Severity Level</span>
                <select bind:value={severity} class="w-full p-2 border rounded-md">
                    <option value="">Select severity</option>
                    <option value="Low">Low</option>
                    <option value="Moderate">Moderate</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                </select>
            </label>

            <label class="block mb-3">
                <span class="text-sm font-medium">Status</span>
                <select bind:value={status} class="w-full p-2 border rounded-md">
                    <option value="">Select status</option>
                    <option value="Active">Active</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Under Investigation">Under Investigation</option>
                </select>
            </label>

            <label class="block mb-3">
                <span class="text-sm font-medium">Contact Info</span>
                <input type="text" bind:value={contactInfo} placeholder="Enter phone/email..." class="w-full p-2 border rounded-md"/>
            </label>

            <label class="block mb-3">
                <span class="text-sm font-medium">Relevant details</span>
                <textarea 
                    bind:value={entry} 
                    placeholder="Enter details here..." 
                    class="w-full p-2 border rounded-md"
                ></textarea>
            </label>

            <button 
                on:click={addHazard} 
                class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
                Submit Hazard
            </button>
        </div>
    </div>
</main>