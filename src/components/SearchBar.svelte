<script>
	import { search } from "./api-calls";
    let query = "";
    
</script>

<div id="container">
    <div class="input">
        <input type="text" bind:value={query} placeholder="search for files and modules">
        {#if query == ''}
        <img src="images/send.png" alt="">
        {/if}
    </div>
    {#if query}
    <hr>
    <div id="results">

        {#await search(query, 'module') then results}
        {#if results.length > 0}
        <div>folders: </div>
            {#each results.splice(0, 5) as result}
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
        padding: 15px;
        margin-top: 15px;
        text-align: start;
        color: var(--highlight-color);
        z-index: 2;
    }
    @media screen and (max-width: 900px), screen and (orientation: portrait){
        #container{
            width: 80vw;
        }
    }
    .input{
        display: flex;
        align-items: space-between;
        justify-content: center;
    }
    .input img{
        height: 26px;
        filter: var(--green-icons-filter) brightness(0.9);
        margin-right: 5px;
    }
    input{
        background-color: transparent;
        border: none;
        outline: none;
        width: 100%;
        font-family: var(--main-font);
        font-size: var(--text-0);
        color: var(--highlighted-text-color);
    }
    input::placeholder{
        color: var(--first-title-color);
    }
    hr{
        margin: 5px 0;
        border: solid var(--brand-color) 1px;
    }
    #results{
        max-height: 300px;
        width: 100%;
        overflow-y: auto;
        scrollbar-width: thin;
    }
    #results div{
        font-size: var(--text-0);
        margin: 5px 0;
    }
    .result{
        display: block;
        padding: 5px 8px;
        color: var(--highlight-color);
        text-decoration: none;
        border-radius: var(--element-radius);
    }
    .result:hover{
        background-color: var(--background-2);
    }
</style>