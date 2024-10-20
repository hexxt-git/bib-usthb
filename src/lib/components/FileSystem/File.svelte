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

    $: fileUrl = `/files/${file.route}?${searchQueries.toString()}`;

    function timeAgo(date) {
        const now = new Date();
        let seconds = Math.floor((now - date) / 1000);
        if (seconds < 0) return "unknown";

        const intervals = {
            y: 365 * 24 * 60 * 60,
            m: 30 * 24 * 60 * 60,
            d: 24 * 60 * 60,
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
</script>

<a href={fileUrl}>
    <h2>
        <img src="/images/folder.svg" alt="{file.label} folder" />
        {file.label}
    </h2>
    <span>
        Downloads: {file.downloads}
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
        align-items: end;
        gap: 5px;
    }
    h2 img {
        width: 28px;
        user-select: none;
        filter: invert(1);
    }
    span {
        font-size: 14px;
        line-height: 120%;
    }
</style>
