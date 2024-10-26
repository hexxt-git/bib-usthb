<script>
    import DocsViewer from "./DocsViewer.svelte";
    import VideoViewer from "./VideoViewer.svelte";
    import urlJoin from "url-join";
    import PDFViewer from "./PDFViewer.svelte";
    import BreadCrumbs from "./BreadCrumbs.svelte";
    import { page } from "$app/stores";
    import ImageViewer from "./ImageViewer.svelte";
    import AudioViewer from "./AudioViewer.svelte";

    let isMobile = false;
    import { onMount } from "svelte";
    import { imageContainerSize } from "./imageContainerStore";

    onMount(() => {
        const checkMobile = () => {
            isMobile = window.innerWidth / window.innerHeight <= 1;
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    });

    $: file = $page.data;
</script>

<div id="container">
    <div id="top">
        <h2>
            {file.label}
        </h2>
        <div id="buttons">
            {#if /image/i.test(file?.mimeType)}
                <button on:click={() => imageContainerSize.update((value) => !value)}>
                    <img src="/images/containerSize{$imageContainerSize ? '' : 'Extend'}.svg" alt="" />
                </button>
            {/if}
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
    {:else if /pdf/i.test(file?.mimeType) && !isMobile}
        <PDFViewer />
    {:else if /ms|openxmlformats|officedocument|google-apps|text|pdf/i.test(file?.mimeType)}
        <DocsViewer />
    {:else}
        <div class="unavailable">
            Preview Unavailable for this file type, <a
                href={urlJoin("/downloads", file?.path || "/")}
                download
            >
                download
            </a>
        </div>
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
        height: 32px;
        background: #1e2f44;
        border-radius: 5px;
        cursor: pointer;
    }
    #top img:hover {
        background: #273a55;
    }
    #buttons {
        display: flex;
        gap: 8px;
    }
    #buttons button {
        display: contents;
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
    .unavailable {
        padding-top: 10%;
        font-size: large;
        text-align: center;
    }
    .unavailable a {
        font-family: inherit;
        font-size: inherit;
        color: inherit;
    }
</style>
