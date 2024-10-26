<script>
    import { imageContainerSize } from "./imageContainerStore.js";
    import { page } from "$app/stores";
    import urlJoin from "url-join";
    $: filePath = urlJoin("/downloads/", $page.data.path || "/");
</script>

<div class={$imageContainerSize ? "container-fit" : "container-scroll"}>
    <img src={filePath} alt="" />
</div>

<style>
    .container-fit {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        position: relative;
    }
    .container-fit img {
        flex-grow: 1;
        max-height: 100%;
        max-width: 100%;
        object-fit: contain;
        border-radius: 5px;
    }
    .container-scroll {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        border-radius: 5px;
        scrollbar-width: thin;
        position: relative;
    }
    .container-scroll img {
        width: 100%;
    }
</style>
