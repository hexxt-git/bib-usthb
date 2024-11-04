<script>
    import Directory from "./Directory.svelte";

    import H1 from "$lib/items/H1.svelte";
    import { page } from "$app/stores";
    import FileViewer from "./FileViewer.svelte";

    $: file = $page.data;
</script>

<svelte:head>
    <title>BiB-USTHB {file.label ? "| " + file.label : ""}</title>
    <meta
        name="description"
        content={file.label
            ? `Explore and view the file: ${file.label} on BiB-USTHB.`
            : "Explore and view files on BiB-USTHB."}
    />
</svelte:head>

<main>
    <div id="fileFinder"></div>
    <a href="/files">
        <H1 style="margin: 0 auto 15px auto">File Finder</H1>
    </a>
    <div id="container">
        {#if !file.error}
            {#if file.isDirectory}
                <Directory />
            {:else}
                <FileViewer />
            {/if}
        {:else}
            <div>ERROR LOADING FILE</div>
            <div>
                {file.error}
            </div>
        {/if}
    </div>
    <a id="contribute" href="/contribute">can't find what you're looking for? contribute when you find it!</a>
</main>

<style>
    main {
        margin: 10px var(--side-margin) 100px var(--side-margin);
    }
    #fileFinder {
        position: relative;
        top: -80px;
    }
    #container {
        background-color: var(--background-1);
        border-radius: var(--window-radius);
        height: calc(90vh - var(--nav-height));
        padding: 30px 30px 15px 30px;
    }
    @media screen and (max-width: 700px) {
        #container {
            padding: 20px 20px 10px 20px;
        }
    }
    #contribute {
        text-align: right;
        display: block;
        padding-top: 5px;
        padding-right: 10px;
        color: var(--text);
        text-decoration: none;
    }
    #contribute:hover {
        text-decoration: underline;
    }
</style>
