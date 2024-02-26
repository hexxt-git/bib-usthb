<script>
    import { config } from './config.js';
    let selected_modules = new Array(config.faculties.length).fill(-1);
    let selected_semesters = new Array(config.faculties.length).fill(-1);

    import Nav from './Nav.svelte';
    import Welcome from './Welcome.svelte';
    import Faculty from './Faculty.svelte';
    import Footer from './Footer.svelte';

</script>

<main>
    <Nav spacer={true} />
    <Welcome />

    <div id="faculties-page">
        <h2>faculties</h2>
        <div id="faculties-container">
            {#each config.faculties as faculty}
                <Faculty faculty={faculty} />
            {/each}
        </div>
    </div>

    {#each config.faculties as faculty, index}
    <div id="{faculty.abriviation}-page" class="faculty-page"> <!-- 3jet ndir hado f modules w7dhom ktch fihom events -->
        <h2>{faculty.english_name}</h2>
        <div id="{faculty.abriviation}-navigator" class="faculty-navigator">
            <div class="module-selector">
                {#each faculty.modules as module, index2}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class="module" style="
                        background-color: {selected_modules[index] === index2 ? 'var(--light-green)' : 'var(--off-off-white)'};
                    " on:click={() => {selected_modules[index] = index2; selected_semesters[index] = -1}}>
                        {module.english_name} <!--<span>50</span>-->
                    </div>
                {/each}
            </div>
            {#if faculty.modules.length && selected_modules[index] !== -1}
                <hr>
            {/if}
            <div class="semester-selector">
                {#if faculty.modules.length && selected_modules[index] !== -1}
                    {#each faculty.modules[selected_modules[index]].semesters as semester, index2}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div class="semester" style="
                            background-color: {selected_semesters[index] === index2 ? 'var(--light-green)' : 'var(--off-off-white)'};
                        " on:click={() => selected_semesters[index] = index2}>
                            {semester.name} <!--<span>50</span>-->
                        </div>
                    {/each}
                {/if}
            </div>
            {#if faculty.modules.length && selected_modules[index] !== -1 && selected_semesters[index] !== -1}
                <hr>
            {/if}
            <div class="subject-selector">
                {#if faculty.modules.length && selected_modules[index] !== -1 && selected_semesters[index] !== -1}
                {#each faculty.modules[selected_modules[index]].semesters[selected_semesters[index]].links as link}
                    <a class="subject" href={link[1]} target="_blank">
                        {link[0]} <!--<span>50</span>-->
                    </a>
                {/each}
                {/if}
            </div>
        </div>
    </div>
    {/each}

    <Footer />

</main>
<style>
    main{
        margin: 0px;
        font-family: 'Roboto', sans-serif;
    }
    #faculties-page{
        padding-top: 20px;
    }
    h2{
        margin: 10px 0px 0px 20px;
        text-decoration: var(--barnd-green) underline;
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
        border-radius: 10px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        -ms-border-radius: 10px;
        -o-border-radius: 10px;
    }
    @media (max-width: 700px), (orientation: portrait) {
        #faculties-container{
            grid-template-columns: 1fr;
        }
    }
    .faculty-page{
        min-height: 200px;
        display: grid;
        grid-template-rows: auto 1fr;
    }
    .faculty-navigator{
        margin: 30px var(--side-margin) 50px var(--side-margin);
        padding: 10px;
        padding-bottom: 20px;
        display: grid;
        grid-template-columns: 5fr 3fr 5fr;
        background-color: var(--off-white);
        box-shadow: var(--window-shadow);
        gap: 10px;
        border-radius: 10px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        -ms-border-radius: 10px;
        -o-border-radius: 10px;
        font-weight: 500;
    }
    hr{
        display: none;
    }
    @media (max-width: 700px), (orientation: portrait) {
        .faculty-navigator{
            grid-template-columns: 1fr;
            gap: 20px;
        }
        hr{
            display: unset;
            background-color: #666;
            height: 1px;
            width: 80%;
            margin: 0px auto;
        }
    }
    .module-selector, .semester-selector, .subject-selector{
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .module, .semester, .subject{
        background-color: var(--off-off-white);
        color: black;
        text-decoration: none;
        padding: 15px 10px 10px 10px;
        display: flex;
        justify-content: space-between;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        -ms-border-radius: 5px;
        -o-border-radius: 5px;
        user-select: none;
        cursor: pointer;
        transition: background-color 0.2s ease-out;
        animation: apear 0.2s ease-in-out;
    }

    @keyframes apear{
        from{ opacity: 0; }
        to{ opacity: 1; }
    }
    /*.module span, .semester span, .subject span{
        color: var(--barnd-green);
        text-decoration: underline;
    }*/
    .module:hover, .semester:hover, .subject:hover{
        text-decoration: underline;
    }
</style>