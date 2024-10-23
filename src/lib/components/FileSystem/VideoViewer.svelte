<script>
    import { page } from "$app/stores";
    import urlJoin from "url-join";
    $: filePath = urlJoin("/downloads/", $page.data.path || "/");
</script>

<div id="container">
    <!-- svelte-ignore a11y-media-has-caption -->
    <video src={filePath} controls></video>
</div>

<style>
    #container{
        display: flex;
        justify-content: center;
    }
    video {
        height: 100%;
        max-width: 100%;
        float: 40%;
        border-radius: 5px;
    }
</style>
