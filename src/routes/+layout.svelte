<script>
    import Navigation from "$lib/Navigation.svelte";
    import Footer from "$lib/Footer.svelte";
    import "../app.css";
    import { selectedAgency } from "$lib/stores.js";
    import { selectedPage } from "$lib/stores.js";

    //  To display all widgets
    selectedAgency.set("All");
    selectedPage.set("Home");

</script>

<Navigation/>
<body>
    <main id="content">
        <slot /> <!--Page specific code-->
        </main>
</body>

<Footer/>
<style>

body {
  min-height: 100vh;
  margin: 0;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
</style>

