<script>
    export let groupedCameras;

    // Get Otago cameras from the loaded data
    $: otagoCameras = groupedCameras?.Otago ?? [];

    // Selected camera state
    let selectedCameraId = null;
    let selectedCamera = null;

    // Watch for selection changes and find the camera
    $: selectedCamera = otagoCameras.find(
        (camera) => camera.id === selectedCameraId,
    );
</script>

<section>
    <h2 class="text-2xl font-bold mb-2">NZTA Traffic Camera</h2>
    
    {#if otagoCameras.length > 0}
        <select
            bind:value={selectedCameraId}
            class="mb-2 w-fit p-1 mt-2 bg-white text-gray-800 dark:bg-gray-800 dark:text-white rounded border cursor-pointer focus:outline-none focus:ring focus:ring-blue-500"
        >
            <option value="" disabled>Select a camera</option>

            {#each otagoCameras as camera}
                <option value={camera.id}>{camera.name}</option>
                {/each}
            </select>
            {#if selectedCamera}
                <div class="mt-4">
                    <img
                        src={selectedCamera.imageUrl}
                        alt={selectedCamera.name || "Image Loading"}
                        class="w-full max-w-md rounded shadow"
                    />
                    <p class="mt-2">{selectedCamera.description}</p>
                </div>
            {:else}
                <p class="font-bold">
                    Please select a traffic camera from above
                </p>
            {/if}
    {:else}
        <p>Loading Otago cameras...</p>
    {/if}
  
</section>
