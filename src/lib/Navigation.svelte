<script>
    import { onMount } from "svelte";

    let dropdownMenu;
    let dropdownDisplayed = false;
    import AgencySelect from "$lib/AgencySelect.svelte";

    function displayMenu() {
        // Toggle the display style of the dropdown menu
        dropdownDisplayed = true;
        dropdownMenu.style.display =
            dropdownMenu.style.display === "flex" ? "none" : "flex";
    }
    import DarkModeButton from "./DarkModeButton.svelte";

    //hides dropdown if anywhere on the page is clicked but the options or the hamburger icon
    function hideDropdown(event) {
        if (
            dropdownDisplayed &&
            !dropdownMenu.contains(event.target) &&
            event.target.id != "hamburger"
        ) {
            dropdownMenu.style.display = "none";
            dropdownDisplayed = false;
        }
    }
    onMount(() => {
        document.addEventListener("click", hideDropdown);
    });
</script>

<header class="flex justify-center items-center sticky top-0 z-[1000] p-2">
    <h1 class="text-center text-xl uppercase underline tracking-widest p-3 drop-shadow-xl m-4 bg-white w-[25em] shadow-[3px_3px_3px]">
        <a href="/" class="text-darkgrey no-underline">Disaster Management System</a>
    </h1>
    <nav>
        <!--Main Items-->
        <ul class="hidden md:flex space-x-3 text-xl p-4">
            <li class="p-4">
                <AgencySelect />
            </li>
            <li class="p-4">
                <DarkModeButton />
            </li>
        </ul>
        <!--Hamburger Menu-->
        <ul class="md:hidden ml-8">
            <li>
                <button id="hamburger" on:click={displayMenu} class="text-4xl cursor-pointer hover:text-gray-800">
                    ☰
                </button>
            </li>
        </ul>
    </nav>
    <nav id="dropdown-menu" bind:this={dropdownMenu}
        class="hidden absolute top-[10em] w-[20em] h-[10em] bg-[#333] text-white rounded-lg border-4 border-black shadow-[3px_3px_10px_black]">
        <ul class="flex flex-col space-y-2 p-4">
            <li class="list-disc ml-8">
                <AgencySelect />
            </li>
            <li class="list-disc ml-8">
                <DarkModeButton />
            </li>
        </ul>
    </nav>
</header>