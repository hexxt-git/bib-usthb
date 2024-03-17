<script>
	import { search } from "./helper";
    let search_val = "";
</script>

<div id="container">
    <input type="text" bind:value={search_val} placeholder="search for files by name">
    {#if search_val}
        <hr>
        <div id="results">
            {#await search(search_val)}
                <div>loading...</div>
            {:then results}
                {#if results.length == 0}
                    <div>no results found</div>
                {:else}
                    {#each results.slice(0, 10) as result}
                        <div>
                            <a href={result.drive_link} target="_blank">{result.title}</a>
                        </div>
                    {/each}
                {/if}
            {:catch error}
                <div>{error.message}</div>
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
        margin: 0;
    }
    #results div{
        text-align: start;
        margin: 5px 0;
        padding: 5px;
    }
    #results div:hover{
        background-color: #f5f5f5;
        text-decoration: underline;
    }
    a{
        color: black;
        text-decoration: none;
    }
</style>