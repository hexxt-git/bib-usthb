<script>
    import { page } from "$app/stores";
    import urlJoin from "url-join";
    $: filePath = urlJoin("/downloads/", $page.data.path);
</script>

<div id="container">
    <img src={filePath} alt="" />
</div>

<style>
    #container {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        border-radius: 5px;
    }
    img {
        width: 100%;
    }
</style>
