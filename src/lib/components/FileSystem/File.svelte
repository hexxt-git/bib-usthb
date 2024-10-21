<script>
    export let file = {
        label: "unknown",
    };

    import { page } from "$app/stores";

    $: searchQueries = $page ? new URLSearchParams($page.url.search) : new URLSearchParams("");

    $: if (searchQueries.has("search")) {
        searchQueries.set("search", "");
        searchQueries = searchQueries;
    }

    import UrlJoin from 'url-join'

    console.log(file)
    $: fileUrl = UrlJoin('/files', file.path.replaceAll(/\\\\|\/\/|\\/g, '/')) + `?${searchQueries.toString()}`;

    function timeAgo(date) {
        const now = new Date();
        let seconds = Math.floor((now - date) / 1000);
        if (seconds < 0) return "unknown";

        const intervals = {
            y: 60 * 60 * 24 * 365,
            m: 60 * 60 * 24 * 30,
            d: 60 * 60 * 24,
            h: 60 * 60,
            min: 60,
        };

        let result = [];

        for (const [unit, value] of Object.entries(intervals)) {
            const count = Math.floor(seconds / value);
            if (count >= 1) {
                result.push(`${count}${unit}${count > 1 ? "" : ""}`);
                seconds -= count * value;
            }
            if (result.length === 2) break;
        }

        return result.length > 0 ? result.join(" ") + " ago" : "just now";

    }

    let icon = 'file'
    if (/image/.test(file.mimeType)) icon = 'image';
    if (/video/.test(file.mimeType)) icon = 'video';
    if (/audio/.test(file.mimeType)) icon = 'audio';
    if (/pdf/.test(file.mimeType)) icon = 'pdf';
    if (/zip|7z|compressed|archive|rar/i.test(file.mimeType)) icon = 'zip';
    if(file.isDirectory) icon = 'directory'

</script>

<a href={fileUrl}>
    <h2>
        <img src="/images/{icon}.svg" alt="go to {file.path}" />

        {file.label}
    </h2>
    <span>
        {file.downloads} download, {file.visits} visits
    </span>
    <span>
        Modified: {timeAgo(new Date(file.lastModified))}
    </span>
</a>

<style>
    a {
        background-color: var(--background-2);
        color: var(--text-color);
        border-radius: 10px;
        cursor: pointer;
        overflow-x: clip;
        text-decoration: none;
        display: grid;
        grid-template-rows: 1fr auto auto;
        padding: 6px;
    }
    h2 {
        color: var(--highlight-color);
        font-size: 18px;
        margin: 0;
        text-transform: capitalize;
        padding: 4px 6px;
        display: flex;
        align-items: center;
        gap: 10px;
        line-height: 120%;
    }
    h2 img {
        width: 30px;
        user-select: none;
        filter: invert(1);
    }
    span {
        font-size: 14px;
        line-height: 120%;
    }
</style>
