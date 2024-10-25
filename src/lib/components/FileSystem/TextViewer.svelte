<script>
    import { page } from "$app/stores";
    import urlJoin from "url-join";

    $: filePath = urlJoin("/downloads/", $page.data.path || "/");
</script>

<div>text</div>

<style>
</style>
