<script>
    import VideoViewer from "./VideoViewer.svelte";
    import urlJoin from "url-join";
    import PDFViewer from "./PDFViewer.svelte";
    import BreadCrumbs from "./BreadCrumbs.svelte";
    import { page } from "$app/stores";
    import ImageViewer from "./ImageViewer.svelte";
    import AudioViewer from "./AudioViewer.svelte";

    $: file = $page.data;
</script>

<div id="container">
    <div id="top">
        <h2>
            {file.label}
        </h2>
        <div id="buttons">
            <a href={urlJoin("/downloads", file?.path || "/")} target="_blank">
                <img src="/images/maximize.svg" alt="" />
            </a>
            <a href={urlJoin("/downloads", file?.path || "/")} download>
                <img src="/images/download.svg" alt="" />
            </a>
        </div>
    </div>
    {#if /image/i.test(file?.mimeType)}
        <ImageViewer />
    {:else if /audio/i.test(file?.mimeType)}
        <AudioViewer />
    {:else if /video/i.test(file?.mimeType)}
        <VideoViewer />
    {:else if /pdf/i.test(file?.mimeType)}
        <PDFViewer />
    {:else if /text/i.test(file?.mimeType)}
        text
    {/if}
    <BreadCrumbs />
</div>

<style>
    #top {
        border-bottom: solid 1px var(--brand-color);
        margin-top: -10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    #top img {
        padding: 5px;
        width: 32px;
        background: #1e2f44;
        border-radius: 5px;
    }
    #top img:hover {
        background: #273a55;
    }
    #buttons {
        display: flex;
        gap: 8px;
    }
    h2 {
        font-size: var(--text-0);
        text-transform: uppercase;
        margin: 0;
        color: var(--highlight-color);
        max-width: 100%;
        word-break: break-all;
    }
    #container {
        display: grid;
        grid-template-rows: auto 1fr auto;
        gap: 10px;
        height: 100%;
        width: 100%;
    }
</style>
