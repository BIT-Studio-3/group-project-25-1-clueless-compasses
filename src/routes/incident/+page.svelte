<script>
  let avatar, fileinput;

  let inputText = "";
  let inputText2 = "";
  let description = "";
  let cause = "";
  let suburb = "";
  let street = "";
  let buildingNumber = "";
  let recordedAt = "";

  let imageBase64 = null;
 
 $: showField = inputText.trim().length > 0;
 $: showField2 = inputText2.trim().length > 0;


 //Sends photo to Imgur
  async function uploadToImgur(imageBase64) {
  const response = await fetch("https://api.imgur.com/3/image", {
    method: "POST",
    headers: {
      Authorization: `Client-ID ${import.meta.env.VITE_IMGUR_CLIENT_ID}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image: imageBase64.split(",")[1], // remove the "data:image/*;base64," part
      type: "base64",
    }),
  });

  const data = await response.json();
  if (!data.success) {
    throw new Error("Imgur upload failed");
  }
  return data.data.link; // this is the image URL
  }

  const onFileSelected = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      imageBase64 = e.target.result;
      avatar = imageBase64;
    };
    reader.readAsDataURL(file);
  };

  async function submitForm() {
    try {
      let photoUrl = null;
      if (imageBase64) {
        photoUrl = await uploadToImgur(imageBase64);
      }

      const body = {
        description,
        cause,
        suburb,
        street,
        buildingNumber,
        recordedAt,
        photoUrl,
      };

      const res = await fetch("http://localhost:3000/api/v1/incidents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log("Incident logged:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

</script>

<!-- Header -->
<h1 class="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 p-1 text-center">
    Incident Log
  </h1>

<main class="flex p-3">
    <!-- First Section -->
    <div class="w-1/3 m-3 bg-gray-50 rounded-lg shadow-md">
      <h2>Incidents</h2>
    </div>

    <!-- Second Section -->
    <div class="w-1/3 m-3 bg-gray-50 rounded-lg shadow-md grid">
      <h2 class="mt-3 ml-3">Incident Report</h2>

      <label class="m-3 grid" for="Description">
        Description of incident
        <input
        type="text"
        bind:value={description}
        placeholder="Enter Description"
        class="border rounded-md mt-1 p-1"
        required />
      </label>

      <label class="m-3 grid" for="Cause">
        Cause of incident
        <input
        type="text"
        bind:value={cause}
        placeholder="Enter Cause"
        class="border rounded-md mt-1 p-1" />
      </label>
      
        <div  class="m-3 grid">
          <label for="triggerInput" class="block text-sm font-medium text-gray-700"
            >Suburb</label
          >
          <input
          type="text"
          id="triggerInput"
          bind:value={inputText}
          class="border rounded-md mt-1 p-1"
          placeholder="Enter Suburb" />
        </div>
       
        {#if showField}
          <div  class="m-3 grid">
            <label for="hiddenField" class="block text-sm font-medium text-gray-700"
              >Street</label
            >
            <input
            type="text"
            id="hiddenField"
            bind:value={street}
            class="border rounded-md mt-1 p-1"
            placeholder="Enter Street" />
          </div>
        {/if}

        {#if showField2}
        <div  class="m-3 grid">
          <label for="hiddenField" class="block text-sm font-medium text-gray-700"
            >Closest building number</label
          >
          <input
          type="text"
          bind:value={buildingNumber}
          class="border rounded-md mt-1 p-1"
          placeholder="Enter Closest Building Number" />
        </div>
      {/if}
     

      <label class="m-3 grid" for="Date">
        Date of recording
        <input
        type="datetime-local"
        bind:value={recordedAt}
        required />
      </label>

      <label class="m-3 grid" for="Photo">
        Upload a photo
        
        {#if avatar}
        <img src={avatar} alt="Preview" />
        {:else}
        <img src="" alt="" />
        {/if}
        <button class="bg-gray-50 hover:bg-gray-300 transition border rounded-md m-2 p-1 cursor-pointer" on:click={()=>{fileinput.click();}}>Upload</button>
        <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} />
      </label>

      <button on:click={submitForm}
      class="bg-gray-50 hover:bg-blue-300 transition border rounded-md m-2 p-1 cursor-pointer">
      Submit
    </button>

    </div>

    
    <!-- Third Section -->
    <div class="w-1/3 m-3 bg-gray-50 rounded-lg shadow-md">
      <h2>Locations already logged</h2>
    </div>
  
</main>

<style>

</style>
