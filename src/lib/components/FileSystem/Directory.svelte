<script>
    import BreadCrumbs from "./BreadCrumbs.svelte";

    import TextInput from "$lib/items/TextInput.svelte";
    import File from "./File.svelte";

    let sortMethods = ["time", "active", "a-z"];
    let sortDirections = ["normal", "reverse"];

    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    $: files = $page.data.directoryChildren;
    $: sortMethod = new URLSearchParams($page.url.search).get("sort") || sortMethods[0];
    $: sortDirection = new URLSearchParams($page.url.search).get("direction") || sortDirections[0];
    $: searchQuery = new URLSearchParams($page.url.search).get("search") || "";

    import { onMount } from "svelte";
    import MiniSearch from "minisearch";

    let sortedFiles = [];
    let miniSearch;

    onMount(() => {
        if (files && files.length > 0) {
            const allFields = Object.keys(files[0]);
            miniSearch = new MiniSearch({
                fields: allFields, // index all fields for full-text search
                storeFields: ["path"], // we only need to store the path
                idField: "path", // use path as the unique identifier
            });
            miniSearch.addAll(files);
        }
    });

    $: if (files || sortMethod || sortDirection || searchQuery) {
        let filesToSort = files;
        if (searchQuery && searchQuery.trim().length > 0) {
            const searchResults = miniSearch?.search(searchQuery.trim(), {
                fuzzy: 0.4,
                prefix: true,
            }) ?? [];
            const matchingPaths = new Set(searchResults.map((result) => result.path));
            filesToSort = files.filter((file) => matchingPaths.has(file.path));
        }

        const reverse = sortDirection === "reverse" ? -1 : 1;
        sortedFiles = filesToSort?.sort((a, b) => {
            switch (sortMethod) {
                case "time":
                    return (new Date(b.lastModified) - new Date(a.lastModified)) * reverse;
                case "active":
                    return (b.downloads - a.downloads) * reverse;
                case "a-z":
                    return a.label.localeCompare(b.label) * reverse;
                default:
                    return a.label.localeCompare(b.label) * reverse;
            }
        });
    }

    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    const debouncedGoto = debounce(async (value) => {
        if (!/files/.test($page.url?.pathname)) await goto("/files");
        goto(`?sort=${sortMethod}&direction=${sortDirection}&search=${value}`);
    }, 3000);
</script>

<div id="container">
    <div id="search">
        <TextInput
            style="gap: 0; min-width: 0;"
            placeholder="search..."
            value={searchQuery}
            onInput={(event) => {
                searchQuery = event.target.value;
                debouncedGoto(event.target.value);
            }}
        />
        <div id="search-buttons">
            <a
                href="?sort={sortMethods.at(-1)}&direction={sortDirection}&search={searchQuery}"
                on:click={async (event) => {
                    event.preventDefault();
                    sortMethods = [sortMethods.at(-1), ...sortMethods.slice(0, -1)];
                    if (!/files/.test($page.url?.pathname)) await goto("/files");
                    goto(`?sort=${sortMethods[0]}&direction=${sortDirection}&search=${searchQuery}`);
                }}
            >
                sort: {sortMethod}
            </a>
            <a
                href="?sort={sortMethod}&direction={sortDirections.at(-1)}&search={searchQuery}"
                on:click={async (event) => {
                    event.preventDefault();
                    sortDirections = [sortDirections.at(-1), ...sortDirections.slice(0, -1)];
                    if (!/files/.test($page.url?.pathname)) await goto("/files");
                    goto(`?sort=${sortMethod}&direction=${sortDirections[0]}&search=${searchQuery}`);
                }}
            >
                {sortDirection}
            </a>
        </div>
    </div>
    <div id="scrollContainer">
        {#if sortedFiles && sortedFiles.length}
            <div id="files">
                {#each sortedFiles as file (file.path)}
                    <File {file} />
                {/each}
            </div>
        {:else if searchQuery}
            <div id="notFound">No Files Match Your Search</div>
        {:else}
            <div id="notFound">No Files Found Here</div>
        {/if}
    </div>
    <BreadCrumbs />
</div>

<style>
    #container {
        display: grid;
        grid-template-rows: auto 1fr auto;
        gap: 10px;
        height: 100%;
        width: 100%;
    }
    #search {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 10px;
    }
    #search-buttons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        min-width: 240px;
    }
    @media screen and (max-width: 700px) {
        #search {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr;
        }
        #search-buttons {
            min-width: 0;
        }
    }
    #search-buttons a {
        border-radius: 15px 15px 0 0;
        border: none;
        border-bottom: solid var(--brand-color) 2px;
        background: var(--background-2);
        color: var(--brand-color);
        font-family: var(--main-font);
        font-size: var(--text-1);
        padding: 0 10px;
        cursor: pointer;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background-color 200ms ease;
    }
    #search-buttons a:hover {
        background-color: #213249;
    }
    #scrollContainer {
        height: fit-content;
        max-height: 100%;
        overflow-y: auto;
        border-radius: 10px;
        scrollbar-width: thin;
    }
    #files {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 10px;
        height: 100%;
        padding-right: 5px;
    }
    @media screen and (max-width: 1900px) {
        #files {
            grid-template-columns: repeat(4, 1fr);
        }
    }
    @media screen and (max-width: 1500px) {
        #files {
            grid-template-columns: repeat(3, 1fr);
        }
    }
    @media screen and (max-width: 1200px) {
        #files {
            grid-template-columns: 16fr 15fr;
        }
    }
    @media screen and (max-width: 600px) {
        #files {
            grid-template-columns: 1fr;
        }
    }
    #notFound {
        font-size: 18px;
        text-align: center;
        margin: 40px 0;
    }
</style>
