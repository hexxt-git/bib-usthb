<script>
    export let faculty;
    faculty.groups = faculty.modules?.reduce((acc, module) => {
        if(!acc.some(group => group.id === module.group.id)) acc.push(module.group);
        return acc;
    }, [])

    let selected_group_id = -1;
    let selected_module_id = -1;
    let select_group = (id) => {
        selected_module_id = -1;
        if(selected_group_id === id) selected_group_id = -1;
        else selected_group_id = id;
    };
    let select_module = (id) => {
        if(selected_module_id === id) selected_module_id = -1;
        else selected_module_id = id;
    }

    $: modules = faculty.modules.filter(m=>m.group.id===selected_group_id);
    import {load} from './helper.js';
</script>

<main id="{faculty.short}-page">
    <h2>{faculty.name}&nbsp;</h2>
    <div id="navigator">
        <div class="collumn">
            {#if faculty.groups.filter(group => group.short != 'other').length == 0}
                no contributions were made to this faculty yet. we encourage you to be the first
            {/if}
            {#each faculty.groups.filter(group => group.short != 'other') as group}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="item group-item {group.id==selected_group_id}" on:click={()=>select_group(group.id)}>
                    {group.name}
                    <a href="https://drive.google.com/drive/folders/{group.drive_id}" target="_blank">
                        <img src="/images/link.png" alt="">
                    </a>
                </div>
            {/each}
        </div>
        {#if selected_group_id != -1}
        <hr>
        {/if}
        <div class="collumn">
            {#each modules as module}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="item {module.id==selected_module_id}" on:click={()=>select_module(module.id)}>
                    <div>
                    {module.name} <!-- ({module.short.toUpperCase()}) -->
                    <a href="https://drive.google.com/drive/folders/{module.drive_id}" target="_blank">
                        <img src="/images/link.png" alt="">
                    </a>
                    </div>

                    {#await load(`https://walrus-app-mwr59.ondigitalocean.app/api/module/${module.id}/getcount/`)}
                        0
                    {:then counts}
                        <span>{
                        counts.cour_count + 
                        counts.exam_count +
                        counts.td_count +
                        counts.tp_count +
                        counts.other_count                            
                        }</span>
                    {/await}
                </div>
            {/each}
        </div>
        {#if selected_group_id != -1 && selected_module_id != -1}
        <hr>
        {/if}
        <div class="collumn">
            {#if selected_module_id !== -1}
            {#await load(`https://walrus-app-mwr59.ondigitalocean.app/api/module/${selected_module_id}/getcount/`) then counts}
                <a class="item" href="https://drive.google.com/drive/folders/{faculty.modules.find(mod=>mod.id===selected_module_id).cour_drive_id}" target="_blank">
                    lessons
                    <span>{counts.cour_count}</span>
                </a>
                <a class="item" href="https://drive.google.com/drive/folders/{faculty.modules.find(mod=>mod.id===selected_module_id).exam_drive_id}" target="_blank">
                    exams
                    <span>{counts.exam_count}</span>
                </a>
                <a class="item" href="https://drive.google.com/drive/folders/{faculty.modules.find(mod=>mod.id===selected_module_id).td_drive_id}" target="_blank">
                    directed work (TD)
                    <span>{counts.td_count}</span>
                </a>
                <a class="item" href="https://drive.google.com/drive/folders/{faculty.modules.find(mod=>mod.id===selected_module_id).tp_drive_id}" target="_blank">
                    practical work (TP)
                    <span>{counts.tp_count}</span>
                </a>
                <a class="item" href="https://drive.google.com/drive/folders/{faculty.modules.find(mod=>mod.id===selected_module_id).other_drive_id}" target="_blank">
                    other
                    <span>{counts.other_count}</span>
                </a>
            {/await}
            {/if}
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
        text-decoration: var(--brand-color) underline;
        user-select: none;
        cursor: pointer;
        width: fit-content;
        font-family: var(--title-font);
        font-size: var(--title-2);
        color: var(--title-color);
        text-transform: capitalize;
    }
    #navigator{
        margin: 30px var(--side-margin) 50px var(--side-margin);
        padding: 10px;
        padding-bottom: 20px;
        display: grid;
        grid-template-columns: 5fr 3fr 5fr;
        background-color: var(--background-1);
        box-shadow: var(--window-shadow);
        gap: 10px;
        border-radius: var(--window-radius);
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
        background-color: var(--background-2);
        color: var(--text-color);
        text-decoration: none;
        padding: 15px 20px 10px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: var(--element-radius);
        user-select: none;
        cursor: pointer;
        transition: background-color 0.2s ease-out;
        animation: apear 0.3s ease-in-out;
        box-shadow: var(--item-shadow);
        text-transform: capitalize;
    }
    .item img{
        height: 18px;
        border-bottom: transparent solid 1px;
        transform: translate(0px, 4px);
        filter: var(--icon-filter);
    }
    .item img:hover{
        border-bottom: black solid 1px;
    }
    .group-item{
        justify-content: flex-start;
        gap: 5px;
    }
    .true{
        background-color: var(--brand-color-weaker);
    }
    @keyframes apear{
        from{ opacity: 0; }
        to{ opacity: 1; }
    }
    a{
        color: var(--text-color);
    }
</style>