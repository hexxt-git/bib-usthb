<script>
    import H1 from "$lib/items/H1.svelte";
    import TextInput from "$lib/items/TextInput.svelte";
    import File from "./File.svelte";

    let sortMethods = ["time", "active", "a-z"];
    let sortDirections = ["normal", "reverse"];

    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    $: files = $page.data.files;

    $: route = $page.data.route;
    let breadCrumbArray = [];
    $: if ($page) {
        breadCrumbArray = [];
        for (let directory of route?.split("/") ?? []) {
            breadCrumbArray.push({
                href: (breadCrumbArray.at(-1)?.href ?? "/files") + "/" + directory,
                label: directory,
            });
            breadCrumbArray = breadCrumbArray;
        }
    }

    $: sortMethod = new URLSearchParams($page.url.search).get("sort") || sortMethods[0];
    $: sortDirection = new URLSearchParams($page.url.search).get("direction") || sortDirections[0];
    $: searchQuery = new URLSearchParams($page.url.search).get("search") || "";

    import Fuse from "fuse.js";

    let sortedFiles = [];
    let fuse;

    $: if (files) {
        const options = {
            keys: ["label"],
            threshold: 0.4,
        };
        fuse = new Fuse(files, options);
    }

    $: if (files || sortMethod || sortDirection || searchQuery) {
        let filesToSort = files;
        searchQuery = searchQuery // do not remove this line
        if (searchQuery && searchQuery.length > 0) {
            const searchResults = fuse.search(searchQuery);
            filesToSort = searchResults.map((result) => result.item);
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
        if (!$page.url.pathname.match("files")) await goto("/files");
        goto(`?sort=${sortMethod}&direction=${sortDirection}&search=${value}`);
    }, 3000);
</script>

<!-- todo: Save to localStorage which folder the user was last on and load it next time -->
<main>
    <div id="fileFinder"></div>
    <a href="#fileFinder">
        <H1 style="margin: 15px auto">File Finder</H1>
    </a>
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
                        if (!$page.url.pathname.match("files")) await goto("/files");
                        goto(`?sort=${sortMethods[0]}&direction=${sortDirection}&search=${searchQuery}`);
                    }}
                    >sort: {sortMethod}
                </a>
                <a
                    href="?sort={sortMethod}&direction={sortDirections.at(-1)}&search={searchQuery}"
                    on:click={async (event) => {
                        event.preventDefault();
                        sortDirections = [sortDirections.at(-1), ...sortDirections.slice(0, -1)];
                        if (!$page.url.pathname.match("files")) await goto("/files");
                        goto(`?sort=${sortMethod}&direction=${sortDirections[0]}&search=${searchQuery}`);
                    }}
                    >{sortDirection}
                </a>
            </div>
        </div>
        <div id="scrollContainer">
            {#if sortedFiles && sortedFiles.length}
                <div id="files">
                    {#each sortedFiles as file}
                        <File {file} />
                    {/each}
                </div>
            {:else}
                <div id="notFound">No Files Found Here</div>
            {/if}
        </div>
        <div id="breadcrumbs">
            {#each breadCrumbArray as { href, label }, index}
                &nbsp;{index !== 0 ? "/" : ""} <a {href}>{label}</a>
            {/each}
        </div>
    </div>
</main>

<style>
    main {
        margin: 20px var(--side-margin) 100px var(--side-margin);
    }
    #search {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 10px;
    }
    @media screen and (max-width: 700px) {
        #search {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr;
        }
    }
    #search-buttons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        min-width: 240px;
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
    }
    #container {
        background-color: var(--background-1);
        border-radius: var(--window-radius);
        height: 700px;
        max-height: calc(85vh - var(--nav-height));
        display: grid;
        grid-template-rows: auto 1fr auto;
        padding: 30px 30px 15px 30px;
        gap: 10px;
    }
    @media screen and (max-width: 600px) {
        #container {
            padding: 20px 20px 10px 20px;
        }
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
    #breadcrumbs a {
        color: var(--brand-color);
        text-decoration: none;
    }
    #breadcrumbs a:hover {
        text-decoration: underline;
    }
    #fileFinder {
        position: relative;
        top: -80px;
    }
</style>
