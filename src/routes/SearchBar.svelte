<script>
	import { onMount } from "svelte";
	import { search } from "./helper";
    let query = "";

    // onMount(async () => {
    //     search('a', 'module').then((res) => {
    //         console.log(res);
    //     });
    // });
    
</script>

<div id="container">
    <input type="text" bind:value={query} placeholder="search for files and folders">
    {#if query}
    <hr>
    <div id="results">

        {#await search(query, 'module') then results}
        {#if results.length > 0}
        <div>folders: </div>
            {#each results.splice(0, 3) as result}
                <a href={'https://drive.google.com/drive/folders/'+result.drive_id} class="result" target="_blank">{result.name}</a>
            {/each}
        {/if}
        {/await}
        
        {#await search(query, 'file') then results}
        {#if results.length > 0}
        <div>files: </div>
        {#each results.splice(0, 30) as result}
            <a href={result.drive_link} class="result" target="_blank">{result.title}</a>
        {/each}
        {/if}       
        {/await}
    
    </div>
    {/if}
</div>

<style>
    #container{
        width: 780px;
        background-color: var(--background-1);
        border-radius: var(--window-radius);
        padding: 10px;
        margin-top: 15px;
        text-align: start;
        color: var(--text-color);
    }
    @media screen and (max-width: 900px), (orientation: portrait){
        #container{
            width: 80vw;
        }
    }
    @media screen and (orientation: portrait){
        #container{
            width: 300px;
        }
    }
    input{
        background-color: transparent;
        border: none;
        outline: none;
        width: 100%;
        font-family: var(--main-font);
        font-size: var(--text-0);
        color: var(--text-color);
    }
    hr{
        margin: 5px 0;
        border: solid var(--brand-color) 1px;
    }
    #results{
        max-height: 300px;
        width: 100%;
        overflow-y: auto;
    }
    #results div{
        font-size: var(--text-0);
        margin: 5px 0;
    }
    .result{
        display: block;
        padding: 5px 8px;
        color: var(--text-color);
        text-decoration: none;
        border-radius: var(--element-radius);
    }
    .result:hover{
        background-color: var(--background-2);
    }
</style>