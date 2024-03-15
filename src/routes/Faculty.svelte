<script>
    export let faculty;
    faculty.groups = faculty.modules?.reduce((acc, module) => {
        if(!acc.some(group => group.id === module.group.id)) acc.push(module.group);
        return acc;
    }, [])
</script>

<main id="{faculty.short}-page">
    <h2>{faculty.name}&nbsp;</h2>
    <div id="navigator">
        <div class="collumn">
            {#each faculty.groups as group}
                <div class="item">
                    {group.name}
                </div>
            {/each}
        </div>
        <hr>
        <div class="collumn">
            {#each faculty.modules as module}
                <div class="item">
                    {module.name}
                </div>
            {/each}
        </div>
        <hr>
        <div class="collumn">
            <div class="item">lessons</div>
            <div class="item">exams</div>
            <div class="item">exercises</div>
            <div class="item">other</div>
        </div>
    </div>
</main>

<style>
    main{
        min-height: 200px;
        display: grid;
        grid-template-rows: auto 1fr;
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
    #navigator{
        margin: 30px var(--side-margin) 50px var(--side-margin);
        padding: 10px;
        padding-bottom: 20px;
        display: grid;
        grid-template-columns: 5fr 3fr 5fr;
        background-color: var(--off-white);
        box-shadow: var(--window-shadow);
        gap: 10px;
        border-radius: 25px;
        font-weight: 500;
    }
    hr{
        display: none;
    }
    @media (max-width: 700px), (orientation: portrait) {
        #navigator{
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
    .collumn{
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .item{
        background-color: var(--off-off-white);
        color: black;
        text-decoration: none;
        padding: 17px 10px 10px 10px;
        display: flex;
        justify-content: space-between;
        border-radius: 15px;
        user-select: none;
        cursor: pointer;
        transition: background-color 0.2s ease-out;
        animation: apear 0.2s ease-in-out;
        box-shadow: #0001 0 3px 6px;
    }

    @keyframes apear{
        from{ opacity: 0; }
        to{ opacity: 1; }
    }
    /*.item span{
        color: var(--brand-green);
        text-decoration: underline;
    }*/
    .item:hover{
        text-decoration: underline;
    }
</style>