<script>
    export let faculty;
    let groups = faculty.modules?.reduce((acc, module) => {
        if(!acc.some(group => group.id === module.group.id)) acc.push(module.group);
        return acc;
    }, []).filter(group => group.short != 'other').sort((a, b) => a.name.localeCompare(b.name));

    let selected_group_id = -1;
    let selected_module_id = -1;
    let select_group = (id) => {
        selected_module_id = -1;
        if(selected_group_id === id) selected_group_id = -1;
        else{
            selected_group_id = id;
            if(window.innerWidth < 700) scroll_to(faculty.short + '-modules')
        }
    };
    let select_module = (id) => {
        if(selected_module_id === id) selected_module_id = -1;
        else{
            selected_module_id = id;
            if(window.innerWidth < 700) scroll_to(faculty.short + '-files')
        }
    }

    $: modules = faculty.modules.filter(m=>m.group.id===selected_group_id).filter(group => group.short != 'other').sort((a, b) => a.name.localeCompare(b.name));
    
    let scroll_to = id => {
        window.open('./#'+id, '_self')
        setTimeout(()=>scrollBy(0, -80), 500)
    }

    import {load} from '/src/components/api-calls';
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<main id="{faculty.short}-page">
    <h2 on:click={e => e.key? 0: scroll_to(faculty.short+'-page')}>{faculty.name}&nbsp;</h2>
    <div id="navigator">
        {#if groups.length == 0}
            no contributions were made to this faculty yet. we encourage you to be the first
        {/if}
        <div class="column" id="{faculty.short}-groups">
            {#each groups as group}
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
        <div class="column" id="{faculty.short}-modules">
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
                        (counts.cour_count + 
                        counts.exam_count +
                        counts.td_count +
                        counts.tp_count +
                        counts.other_count ) || "0"                           
                        }</span>
                    {/await}
                </div>
            {/each}
        </div>
        {#if selected_group_id != -1 && selected_module_id != -1}
        <hr>
        {/if}
        <div class="column" id="{faculty.short}-files">
            {#if selected_module_id !== -1}
            {#await load(`https://walrus-app-mwr59.ondigitalocean.app/api/module/${selected_module_id}/getcount/`) then counts}
                <a class="item" href="https://drive.google.com/drive/folders/{faculty.modules.find(mod=>mod.id===selected_module_id).cour_drive_id}" target="_blank">
                    lessons
                    <span>{counts.cour_count || "0"}</span>
                </a>
                <a class="item" href="https://drive.google.com/drive/folders/{faculty.modules.find(mod=>mod.id===selected_module_id).exam_drive_id}" target="_blank">
                    exams
                    <span>{counts.exam_count || "0"}</span>
                </a>
                <a class="item" href="https://drive.google.com/drive/folders/{faculty.modules.find(mod=>mod.id===selected_module_id).td_drive_id}" target="_blank">
                    directed work (TD)
                    <span>{counts.td_count || "0"}</span>
                </a>
                <a class="item" href="https://drive.google.com/drive/folders/{faculty.modules.find(mod=>mod.id===selected_module_id).tp_drive_id}" target="_blank">
                    practical work (TP)
                    <span>{counts.tp_count || "0"}</span>
                </a>
                <a class="item" href="https://drive.google.com/drive/folders/{faculty.modules.find(mod=>mod.id===selected_module_id).other_drive_id}" target="_blank">
                    other
                    <span>{counts.other_count || "0"}</span>
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
        padding: 15px;
        padding-bottom: 20px;
        display: grid;
        grid-template-columns: 5fr 4fr 4fr;
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
    .column{
        display: flex;
        flex-direction: column;
        gap: 8px;

        max-height: 600px;
        overflow-y: auto;
        scrollbar-width: thin;
        padding-right: 5px;

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