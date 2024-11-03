<script>
    import { page } from "$app/stores";
    import urlJoin from "url-join";

    $: filePath = urlJoin("/downloads/", $page.data.path || '/');
</script>

<iframe src={filePath} frameborder="0" title={$page.data.label} />

<style>
    iframe {
        width: 100%;
        height: 100%;
        border-radius: 10px;
    }
</style>
