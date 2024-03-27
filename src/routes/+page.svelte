<script>
    import Nav from './Nav.svelte';
    import Welcome from './Welcome.svelte';
    import Faculties from './Faculties.svelte';
    import Faculty from './Faculty.svelte';
    import Footer from './Footer.svelte';
    
    import { load } from './helper.js';
	import { notify } from './notification_store';
	import { onMount } from 'svelte';
    
    // load("https://walrus-app-mwr59.ondigitalocean.app/api/fac/all").then(faculties => {
    //     console.table(faculties);
    // })

    onMount(()=>{
        notify({
            state: "notification",
            message: "welcome amongst the first visitors of this website, please be patient as we are still in development.",
            duration: 30*1000
        })
        notify({
            state: "notification",
            message: "if you notice a module or faculty missing, please shoot us an email at bibusthb@gmail.com.",
            duration: 30*1000
        })
    })

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