<script>
    import { page } from "$app/stores";
    import urlJoin from "url-join";
    $: filePath = urlJoin("/downloads/", $page.data.path);
</script>

<div id="container">
    <img src={filePath} alt="" />
</div>

<style>
    /* #fit-container {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #fit-container img {
        height: 90%;
    } */
    #container {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        border-radius: 5px;
    }
    #container img {
        width: 100%;
    }
</style>
