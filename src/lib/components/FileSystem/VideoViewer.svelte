<script>
    import { page } from "$app/stores";
    import urlJoin from "url-join";
    $: filePath = urlJoin("/downloads/", $page.data.path);
</script>

    <video src={filePath} controls></video>

<style>
    video {
        display: block;
        height: 100%;
        max-width: 100%;
        margin: 0 auto;
    }
</style>
