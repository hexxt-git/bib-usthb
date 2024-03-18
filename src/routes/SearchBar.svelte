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
        background-color: white;
        border-radius: 25px;
        padding: 10px;
        margin-top: 20px;
        text-align: start;
    }
    @media screen and (max-width: 900px), (orientation: portrait){
        #container{
            width: 80vw;
        }
    }
    input{
        background-color: transparent;
        border: none;
        outline: none;
        width: 100%;
        font-family: 'roboto' sans-serif;
        font-size: 1.3em;
    }
    hr{
        margin: 5px 0;
        border: solid var(--brand-green) 1px;
    }
    #results{
        max-height: 300px;
        width: 100%;
        overflow-y: auto;
    }
    #results div{
        font-size: 1.2em;
        margin: 5px 0;
    }
    .result{
        display: block;
        padding: 5px 8px;
        color: black;
        text-decoration: none;
        border-radius: 10px;
    }
    .result:hover{
        background-color: #f5f5f5;
    }
</style>