<script> /* this whole code base requires a restructure */
    import Welcome from '/src/components/Welcome.svelte';
    import Faculties from '/src/components/Faculties.svelte';
    import Faculty from '/src/components/subcomponents/Faculty.svelte';
    
    import { load } from '/src/components/api-calls';
	import { notify } from '/src/components/notification_store';
	import { onMount } from 'svelte';
    
    // load("https://walrus-app-mwr59.ondigitalocean.app/api/fac/all").then(faculties => {
    //     console.table(faculties);
    // })

    onMount(()=>{
        setTimeout(()=>
            notify({
                state: "notification",
                message: "welcome amongst the first visitors of this website, please be patient as we are still in development.",
                duration: 30*1000
            }),
        800)
        setTimeout(()=>
            notify({
                state: "notification",
                message: "if you notice a module or faculty missing, please contact us through the support page bib-usthb.com/feedback",
                duration: 30*1000
            }),
        1800)
    })

</script>

<main>
    <Welcome />
    <Faculties />

    {#await load("https://walrus-app-mwr59.ondigitalocean.app/api/fac/all") then faculties}
        {#if faculties.length > 0}
            {#each faculties.filter(faculty => faculty.short != 'other').sort((a, b) => a.name.localeCompare(b.name)) as faculty}
                <Faculty {faculty}/>
            {/each}
        {/if}
    {:catch error}
        <p style="color: red;">
            error: {error.message}<br>
            please contact support and try again later
        </p>
    {/await}
</main>

<style>
    main{
        margin: 0px;
        font-family: var(--main-font);
        background-color: var(--background-0);
        color: var(--text-color)
    }
</style>