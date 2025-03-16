<script>
    // all code for dark mode 
    let dark;
    function toggle() {
        dark = !dark;
        const content = document.getElementById('content');
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');

        if (dark) {
            document.body.classList.add('dark');
            content.classList.add('dark');
            header.classList.add('dark');
            footer.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
            content.classList.remove('dark');
            header.classList.remove('dark');
            footer.classList.remove('dark');
        }
    }
</script>
<button on:click={toggle}>
    {#if dark }
    ☀️ Light Mode
    {:else}
    🌙 Dark Mode
    {/if}
</button>
<style>
    button{
        padding: 0.6em 1em 0.6em 1em;
        font-family: inherit;
        font-size: inherit;
        font-weight: bolder;
        background-color: #333;
        color: white;
        cursor: pointer;
    }
    :global(body.dark) button{
        background-color: white;
        color: #333;
    }
</style>