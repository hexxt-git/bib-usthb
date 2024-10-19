<script>
    import H1 from "$lib/items/H1.svelte";
    import TextInput from "$lib/items/TextInput.svelte";
    import File from "./File.svelte";
    import { debounce } from "lodash-es";

    let sortMethods = ["date", "active", "size"];
    let sortDirections = ["ascending", "descending"];

    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    $: files = $page.data.files;

    $: route = $page.data.route;
    let routeLinks = [];
    $: if ($page) {
        routeLinks = [];
        for (let directory of route?.split("/") ?? []) {
            routeLinks.push({
                href: (routeLinks.at(-1)?.href ?? "/files") + "/" + directory,
                label: directory,
            });
            routeLinks = routeLinks;
        }
    }

    $: sortMethod =
        new URLSearchParams($page.url.search).get("sort") || sortMethods[0];
    $: sortDirection =
        new URLSearchParams($page.url.search).get("direction") ||
        sortDirections[0];
    $: searchQuery = new URLSearchParams($page.url.search).get("search") || "";

    let filteredFiles = files;
    $: if ((files, sortMethod, sortDirection, searchQuery)) {
        filteredFiles = files; // todo
    }

    const debouncedGoto = debounce((value) => {
        goto(
            null,
            `?sort=${sortMethod}&direction=${sortDirection}&search=${value}`,
        );
    }, 1500);
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
                    href="?sort={sortMethods[
                        (sortMethods.indexOf(sortMethod) + 1) %
                            sortMethods.length
                    ]}&direction={sortDirection}&search={searchQuery}"
                    on:click={(e) => {
                        const currentIndex = sortMethods.indexOf(sortMethod);
                        const nextIndex =
                            (currentIndex + 1) % sortMethods.length;
                        sortMethod = sortMethods[nextIndex];
                    }}
                >
                    sort: {sortMethod}
                </a>
                <a
                    href="?sort={sortMethod}&direction={sortDirections[
                        (sortDirections.indexOf(sortDirection) + 1) %
                            sortDirections.length
                    ]}&search={searchQuery}"
                    on:click={(e) => {
                        const currentIndex =
                            sortDirections.indexOf(sortDirection);
                        const nextIndex =
                            (currentIndex + 1) % sortDirections.length;
                        sortDirection = sortDirections[nextIndex];
                    }}
                >
                    {sortDirection}
                </a>
            </div>
        </div>
        <div id="scrollContainer">
            <div id="files">
                {#each files ?? [] as file}
                    <File {file} />
                {/each}
            </div>
        </div>
        <div id="breadcrumbs">
            {#each routeLinks as { href, label }, index}
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
