<script>
    import { page } from "$app/stores";
    import urlJoin from "url-join";

    $: filePath = urlJoin("https://bib-usthb.com", "/downloads/", $page.data.path || "/");
</script>

<div>
    <iframe src="https://docs.google.com/gview?url={filePath}&embedded=true" title="viewing document"
    ></iframe>
</div>

<style>
    iframe {
        border: none;
        width: 100%;
        height: 100%;
    }
</style>
