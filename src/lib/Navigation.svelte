<script>
    import { onMount } from "svelte";

    let dropdownMenu;
    let dropdownDisplayed=false;
    import AgencySelect from "$lib/AgencySelect.svelte";

    function displayMenu() {
        // Toggle the display style of the dropdown menu
        dropdownDisplayed=true;
        dropdownMenu.style.display = dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
    }
    import Button from "./DarkModeButton.svelte";

    //hides dropdown if anywhere on the page is clicked but the options or the hamburger icon
  function hideDropdown(event){
    if(dropdownDisplayed&&!dropdownMenu.contains(event.target)&&event.target.id!="hamburger"){
        dropdownMenu.style.display = 'none';
        dropdownDisplayed = false;
    }
  }
  onMount(()=>{
    document.addEventListener("click", hideDropdown);
  });
</script>

<header>   
    <h1><a href='/'>Disaster Management System</a></h1>
    <nav>
        <!--Main Items-->
        <ul>
            <li id="dropdown">
                <AgencySelect />
            </li>

            <li id="button">
                <Button/>
            </li>
        </ul>
        <!--Hamburger Menu-->
        <ul>
            <li>
                <button id="hamburger" on:click={displayMenu}>☰</button>
            </li>
        </ul>
    </nav>
    <nav id="dropdown-menu" bind:this={dropdownMenu}>
        <ul >
            <!-- Add items for the dropdown menu here -->
            <li>
                <AgencySelect />
            </li>
            <li id="button">
                <Button/>
            </li>
        </ul>
    </nav>
</header>

<style>
    header{
        display: flex;
        justify-content: center;
        align-items: center;
        position: sticky;
        top: 0;
        z-index: 1000;
    }
    h1 a{
        color: #333;
        text-decoration: none;
    }
    h1 {
        width: 25em;
        font-size: 20px;
        text-transform: uppercase;
        text-decoration: underline;
        letter-spacing: 4px;    
        text-align: center;
        background-color: white;
        padding: 0.6em;
        box-shadow: 3px 3px 3px;
        margin-left: 1em;
    }
    ul li a {
        text-decoration: none;
        color:white;
        font-weight: 600;
    }
    ul li:hover a{    
        color: #333;  
    }

    ul {
        display: flex;
        justify-content: center;
        list-style: none;
        font-size: 1.2em;
        /* Puts the title onto the same line */      
        /*Centers list elements directly*/
        padding: 1em; 
    }
    ul li{
        padding: 0.3em 0.8em 0.3em 0.8em;
        border-radius: 0.625em;
        margin: 10px;  
        align-self: center;
    }
    /*ul list that contains the #hamburger a tag ☰*/
    ul:last-of-type{
        display: none;
    }

    #dropdown-menu{
        display: none;
        background-color: #333;
        width: 20em;
        position: absolute;
        top: 10em;
        border-radius: 1em;
    }
    #dropdown-menu ul{
        flex-direction: column;
    }
    #dropdown-menu ul li{
        align-self: last baseline;
        list-style: square;
        color: white;
        margin-left: 2em;
    }
    #dropdown-menu ul li a:hover{
        background-color: white;
        color: #333;       
    }
  #dropdown-menu a{
        padding-right: 6em;
        padding-top: 1em;
        cursor: pointer;
    }
 #dropdown-menu li{
    padding: 0;
 }
    #hamburger{
        font-size: 40px;
        cursor: pointer;
    }
    ul:has(#hamburger) {
    /* Styles for the <ul> containing the #hamburger */
        margin-left: 2em;
    }

    button{
        padding: 0;
        border: none;
        background-color: transparent;
        font-family: inherit;
        font-weight: bolder;
        font-size: inherit;
        color: white;
        cursor: pointer;
    }
    #button{
        padding: 0;
    }
    #hamburger:hover{
        color: #333;
    }
@media (width <= 1200px){
    /*First list on nav menu*/
    ul:first-of-type{
        display: none;
    }
    /*Last list on nav menu for hamburger menu*/
    ul:last-of-type{
        display: flex;
    }
    #dropdown-menu{
        border: 5px solid black;
        box-shadow: 3px 3px 10px black;
    }
}

</style>