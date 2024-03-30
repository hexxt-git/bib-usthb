<script>
    import { load } from './helper.js';
    import { notify } from './notification_store.js';

    let scroll_to_fac = fac => {
        window.open('./#'+fac+'-page', '_self')
        setTimeout(()=>scrollBy(0, -80), 900) // scuffed scroll
    }
</script>

<main id="faculties-page">
    <h2>Faculties&nbsp;</h2>
    <div id="faculties-container">
        {#await load("https://walrus-app-mwr59.ondigitalocean.app/api/fac/all")}
            loading... 
        {:then faculties}
            {#if faculties.length > 0}
                {#each faculties.filter(faculty => faculty.short != 'other') as faculty}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div class="faculty" on:click={()=>scroll_to_fac(faculty.short)}>
                        <img src="/images/university.png" alt="">
                        <span>
                            {faculty.short != 'extra' ? 'Faculty of' : ''}
                            {faculty.name}
                        </span>
                    </div>
                {/each}
            {:else}
                <p style="color: red;">
                    error: loading website data<br>
                    please contact support and try again later <br>
                    {notify({state: 'error', message: 'error loading page \nreload and try again later', duration: 10*1000})}
                </p>
            {/if}
        {:catch error}
            <p style="color: red;">
                error: {error.message}<br>
                please contact support and try again later <br>
                {notify({state: 'error', message: 'error loading page \nreload and try again later', duration: 10*1000})}
            </p>

        {/await}
    </div>
</main>

<style>
    main{
        padding-top: 20px;
    }
    h2{
        margin: 10px 0px 0px 20px;
        text-decoration: var(--brand-color) underline;
        user-select: none;
        cursor: pointer;
        width: fit-content;
        font-family: var(--title-font);
        font-size: var(--title-2);
        color: var(--title-color);
    }
    #faculties-container{
        margin: 40px var(--side-margin);
        background-color: var(--background-1);
        box-shadow: var(--window-shadow);
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        padding: 10px;
        padding-bottom: 20px;
        border-radius: var(--window-radius);
    }
    @media (max-width: 700px), (orientation: portrait) {
        #faculties-container{
            grid-template-columns: 1fr;
        }
    }
    .faculty{
        height: 65px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        padding: 10px;
        cursor: default;
        border-radius: var(--element-radius);
        color: var(--text-color);
        text-decoration: none;
        font-weight: 500;
        font-size: var(--text-1);
        transition: 0.2s ease;
        text-transform: capitalize;
        cursor: pointer;
    }
    .faculty:hover{
        background: var(--background-2);
        box-shadow: var(--item-shadow);
    }
    /* span{
        cursor: pointer;
    }
    span:hover{
        text-decoration: underline;
    } */
    img{
        height: 90%;    
        filter: var(--green-icons-filter);
    }
</style>
