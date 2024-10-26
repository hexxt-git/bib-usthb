<script>
    import { page } from "$app/stores";
    import urlJoin from "url-join";

    $: filePath = urlJoin($page.url.origin || "https://bib-usthb.com", "/downloads/", $page.data.path || "/");
</script>

<main>
    <p>loading file, this may take a while...</p>
    <div>
        <iframe src="https://docs.google.com/gview?url={filePath}&embedded=true" title="viewing document"
        ></iframe>
    </div>
</main>

<style>
    main {
        position: relative;
    }
    p {
        position: absolute;
        top: 40%;
        text-align: center;
        width: 100%;
        z-index: 0;
    }
    div {
        height: 100%;
        position: relative;
    }
    iframe {
        border: none;
        width: 100%;
        height: 100%;
        z-index: 10;
    }
</style>
