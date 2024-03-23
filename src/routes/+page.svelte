<script>
    import Nav from './Nav.svelte';
    import Welcome from './Welcome.svelte';
    import Faculties from './Faculties.svelte';
    import Faculty from './Faculty.svelte';
    import Footer from './Footer.svelte';
    
    import { load } from './helper.js';
    
    // load("https://walrus-app-mwr59.ondigitalocean.app/api/fac/all").then(faculties => {
    //     console.table(faculties);
    // })

</script>

<main>
    <Nav />
    <Welcome />
    <Faculties />

    {#await load("https://walrus-app-mwr59.ondigitalocean.app/api/fac/all") then faculties}
        {#if faculties.length > 0}
            {#each faculties as faculty}
                <Faculty {faculty}/>
            {/each}
        {/if}
    {:catch error}
        <p style="color: red;">
            error: {error.message}<br>
            please contact support and try again later
        </p>
    {/await}

    <Footer />

</main>
<style>
    main{
        margin: 0px;
        font-family: var(--main-font);
        background-color: var(--background-0);
        color: var(--text-color)
    }
</style>