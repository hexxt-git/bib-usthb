<script>
    import Directory from "./Directory.svelte";

    import H1 from "$lib/items/H1.svelte";
    import { page } from "$app/stores";
    import FileViewer from "./FileViewer.svelte";
</script>

<main>
    <div id="fileFinder"></div>
    <a href="#fileFinder">
        <H1 style="margin: 0 auto 15px auto">File Finder</H1>
    </a>
    <div id="container">
        {#if $page.data.isDirectory}
            <Directory />
        {:else}
            <FileViewer />
        {/if}
    </div>
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
</style>
