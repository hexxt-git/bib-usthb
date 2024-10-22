<script>
    import { goto } from "$app/navigation";
    export let file = {
        label: "unknown",
    };

    import { page } from "$app/stores";
    import { onMount } from "svelte";

    $: searchQueries = $page ? new URLSearchParams($page.url.search) : new URLSearchParams("");

    $: if (searchQueries.has("search")) {
        searchQueries.set("search", "");
        searchQueries = searchQueries;
    }

    import UrlJoin from "url-join";

    // console.log(file);
    $: fileUrl =
        UrlJoin("/files", file.path.replaceAll(/\\\\|\/\/|\\/g, "/") || "/") + `?${searchQueries.toString()}`;

    $: downloadUrl =
        UrlJoin("/downloads", file.path.replaceAll(/\\\\|\/\/|\\/g, "/") || "/") +
        `?${searchQueries.toString()}`;

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

    let canShare = false;
    onMount(() => {
        canShare = navigator?.canShare?.call() ?? false;
    });

    function shareFile() {
        if (!navigator?.canShare?.call()) {
            console.error("unable to share!");
            return;
        }

        navigator.share({
            title: `${file.label} on BiB-USTHB.com`,
            text: "BiB-USTHB is the unofficial student resource sharing platform for all usthb students",
            url: UrlJoin("https://bib-usthb.com/", fileUrl || "/"),
        });
    }

    function downloadFile() {
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = file.label;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function copyLink() {
        const link = UrlJoin("https://bib-usthb.com/", fileUrl || "/");
        navigator.clipboard.writeText(link).then(
            () => {
                console.log("Link copied to clipboard!");
            },
            (err) => {
                console.error("Failed to copy the link: ", err);
            },
        );
    }

    let icon = "file";
    if (/image/.test(file.mimeType)) icon = "image";
    if (/video/.test(file.mimeType)) icon = "video";
    if (/audio/.test(file.mimeType)) icon = "audio";
    if (/pdf/.test(file.mimeType)) icon = "pdf";
    if (/zip|7z|compressed|archive|rar/i.test(file.mimeType)) icon = "zip";
    if (file.isDirectory) icon = "directory";

    let opened = false;
    let openBtn;
</script>

<a id="link" href={fileUrl}>
    <h2>
        <img src="/images/{icon}.svg" alt="go to {file.path}" />
        {file.label}
    </h2>
    <span>
        {#if file.downloads}
            {file.downloads} download,
        {/if}
        {file.visits} visits
    </span>
    <span>
        Modified: {timeAgo(new Date(file.lastModified))}
    </span>
    <button
        id="open"
        bind:this={openBtn}
        on:click|preventDefault={(event) => {
            openBtn?.focus();
            opened = !opened;
        }}
        on:focusout={() => {
            setTimeout(() => {
                opened = false;
            }, 300);
        }}
    >
        <img src="/images/open.svg" alt="open" />
        <div id="list" style={opened ? "display: flex;" : ""}>
            <a href={fileUrl} on:click|preventDefault={() => goto(fileUrl)}>open</a>
            {#if canShare}
                <button on:click|preventDefault|stopPropagation={shareFile}>share</button>
            {/if}
            <button on:click={copyLink}>copy link</button>
            <a href={downloadUrl} on:click|preventDefault={downloadFile} download>download</a>
        </div>
    </button>
</a>

<style>
    #link {
        background-color: var(--background-2);
        color: var(--text-color);
        border-radius: 10px;
        overflow-x: clip;
        text-decoration: none;
        display: grid;
        grid-template-rows: 1fr auto auto;
        grid-template-columns: 1fr auto;
        padding: 8px;
        transition: background-color 100ms ease;
    }
    #link:hover:not(:has(#open:hover)) {
        background-color: #213249;
    }
    h2 {
        color: var(--highlight-color);
        font-size: 18px;
        margin: 0;
        text-transform: capitalize;
        display: flex;
        align-items: center;
        gap: 10px;
        line-height: 120%;
        padding: 5px 0;
    }
    h2 img {
        width: 30px;
        user-select: none;
        filter: invert(1);
        padding-bottom: 5px;
    }
    span {
        font-size: 14px;
        line-height: 140%;
    }
    #open {
        grid-row: -1 / 1;
        grid-column: -2 / -1;
        padding: 10px 5px 0 0;
        background: none;
        border: none;
        height: fit-content;
        cursor: pointer;
        position: relative;
    }
    #open img {
        width: 30px;
        height: 30px;
        background-color: #1c2638;
        user-select: none;
        border-radius: 100%;
        padding: 4px;
        transition: background-color 300ms ease;
    }
    #open:hover img {
        background-color: #192335;
    }
    #list {
        position: absolute;
        top: 50%;
        right: 50%;
        background-color: var(--background-1);
        color: var(--text-color);
        gap: 5px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        z-index: 1;
        box-shadow: var(--search-glow) 0 10px 15px -5px;
        display: none;
        overflow: hidden;
    }
    #list > a,
    #list > button {
        padding: 8px 15px;
        color: var(--text-color);
        text-decoration: none;
        width: 100%;
        text-align: start;
        background: none;
        border: none;
        display: inline;
        cursor: pointer;
        white-space: nowrap;
    }
    #list > a:hover,
    #list > button:hover {
        background-color: #213249;
    }
</style>
