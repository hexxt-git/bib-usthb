<script>
    import { load } from './helper.js';
</script>

<main id="faculties-page">
    <h2>faculties&nbsp;</h2>
    <div id="faculties-container">
        {#await load("https://walrus-app-mwr59.ondigitalocean.app/api/fac/all")}
            loading... 
        {:then faculties}
            {#if faculties.length > 0}
                {#each faculties as faculty}
                    <a class="faculty" href="#{faculty.short}-page">
                        <img src="/images/university.png" alt="">
                        <span>{faculty.name}</span>
                    </a>
                {/each}
            {:else}
                <p style="color: red;">
                    error: loading faculties<br>
                    please contact support and try again later
                </p>
            {/if}
        {:catch error}
            <p style="color: red;">
                error: {error.message}<br>
                please contact support and try again later
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
        text-decoration: var(--brand-green) underline;
        user-select: none;
        cursor: pointer;
        width: fit-content;
        font-family: 'Rubik';
        color: #101010;
    }
    #faculties-container{
        margin: 40px var(--side-margin);
        background-color: var(--off-white);
        box-shadow: var(--window-shadow);
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        padding: 10px;
        padding-bottom: 20px;
        border-radius: 25px;
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
        border-radius: 15px;
        color: black;
        text-decoration: none;
        font-weight: 500;
        font-size: 18px;
    }
    .faculty:hover{
        background: var(--off-off-white);
    }
    span{
        cursor: pointer;
    }
    span:hover{
        text-decoration: underline;
    }
    img{
        height: 90%;
    }
</style>
