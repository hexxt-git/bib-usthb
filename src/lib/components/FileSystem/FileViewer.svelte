<script>
	import PDFViewer from './PDFViewer.svelte';
    import BreadCrumbs from "./BreadCrumbs.svelte";
    import { page } from "$app/stores";
    import ImageViewer from "./ImageViewer.svelte";

    $: file = $page.data;
</script>

<div id="container">
    <h2>{file.label}</h2>
    {#if file.mimeType.match("image")}
        <ImageViewer />
    {:else if file.mimeType.match("video")}
        video
    {:else if file.mimeType.match("pdf")}
        <PDFViewer />
    {:else if file.mimeType.match("text")}
        text
    {/if}
    <BreadCrumbs />
</div>

<style>
    h2 {
        margin: 0 auto;
        font-size: var(--text-0);
        text-decoration: underline;
    }
    #container {
        display: grid;
        grid-template-rows: auto 1fr auto;
        gap: 10px;
        height: 100%;
        width: 100%;
    }
</style>
