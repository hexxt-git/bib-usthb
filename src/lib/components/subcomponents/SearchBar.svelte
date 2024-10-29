<script>
    let query = "";

    const searchPhrase = "search for files and modules ";
    let placeholder = searchPhrase;
    let i = 0;
    setInterval(() => {
        placeholder = searchPhrase.slice(0, i) + (Math.round(i / 6) % 2 ? "" : "|");
        i++;
        if (i > searchPhrase.length + 30) i = 0;
    }, 50);

    const search = async (query) => {
        if (query && query.trim().length > 0) {
            const response = await fetch(`/search?query=${query}`);
            const results = await response.json();
            console.log({ query, results });
            return results;
        }
    };
</script>

<div id="container">
    <div class="input">
        <input type="text" bind:value={query} {placeholder} />
        {#if query == ""}
            <img src="icons/navigation/send.png" alt="" />
        {/if}
    </div>
    {#if query && query.trim().length}
        <hr />
        <div id="results">
            {#await search(query) then results}
                {#if results && results.length >= 0}
                    {#each results as result}
                        <a href="/files/{result.path}" class="result">{result.path}</a>
                    {/each}
                {/if}
            {/await}
        </div>
    {/if}
</div>

<style>
    #container {
        width: 780px;
        background-color: var(--background-1);
        border-radius: var(--window-radius);
        padding: 15px;
        margin-top: 15px;
        text-align: start;
        color: var(--highlight-color);
        z-index: 2;
        box-shadow: var(--search-glow) 0 18px 10px -8px;
    }
    @media screen and (max-width: 900px), screen and (orientation: portrait) {
        #container {
            width: 80vw;
        }
    }
    .input {
        display: flex;
        align-items: space-between;
        justify-content: center;
    }
    .input img {
        height: 26px;
        filter: var(--green-icons-filter) brightness(0.9);
        margin-right: 5px;
    }
    input {
        background-color: transparent;
        border: none;
        outline: none;
        width: 100%;
        font-family: var(--main-font);
        font-size: var(--text-0);
        color: var(--highlighted-text-color);
    }
    input::placeholder {
        color: var(--first-title-color);
        opacity: 1;
        transition: color 400ms ease;
    }
    #container:hover input::placeholder,
    input:focus::placeholder {
        color: transparent;
    }
    hr {
        margin: 5px 0;
        border: solid var(--brand-color) 1px;
    }
    #results {
        max-height: 300px;
        width: 100%;
        overflow-y: auto;
        scrollbar-width: thin;
    }
    #results div {
        font-size: var(--text-0);
        margin: 5px 0;
    }
    .result {
        display: block;
        padding: 5px 8px;
        color: var(--highlight-color);
        text-decoration: none;
        border-radius: var(--element-radius);
    }
    .result:hover {
        background-color: var(--background-2);
    }
</style>
