<script>
    import { goto } from "$app/navigation";
    export let file = {
        label: "unknown",
    };

    import { page } from "$app/stores";
    import { onMount } from "svelte";

    $: urlParams = $page ? new URLSearchParams($page.url.search) : new URLSearchParams("");

    $: if (urlParams.has("search")) {
        urlParams.set("search", "");
        urlParams = urlParams;
    }

    import UrlJoin from "url-join";

    $: previewUrl =
        UrlJoin("/files", file.path.replaceAll(/\\\\|\/\/|\\/g, "/") || "/") + `?${urlParams.toString()}`;

    $: downloadUrl =
        UrlJoin("/downloads", file.path.replaceAll(/\\\\|\/\/|\\/g, "/") || "/") + `?${urlParams.toString()}`;

    function formatTimeAgo(date) {
        const now = new Date();
        let seconds = Math.floor((now - date) / 1000);
        if (seconds < 0) return "unknown";

        const timeIntervals = {
            y: 60 * 60 * 24 * 365,
            m: 60 * 60 * 24 * 30,
            d: 60 * 60 * 24,
            h: 60 * 60,
            min: 60,
        };

        let timeParts = [];

        for (const [unit, value] of Object.entries(timeIntervals)) {
            const count = Math.floor(seconds / value);
            if (count >= 1) {
                timeParts.push(`${count}${unit}${count > 1 ? "" : ""}`);
                seconds -= count * value;
            }
            if (timeParts.length === 2) break;
        }

        return timeParts.length > 0 ? timeParts.join(" ") + " ago" : "just now";
    }

    let isShareAvailable = false;
    onMount(() => {
        isShareAvailable = navigator?.canShare?.call() ?? false;

        // Close context menu when clicking or right-clicking outside
        const handleOutsideInteraction = (event) => {
            if (
                isContextMenuOpen &&
                !contextMenuRef?.contains(event.target) &&
                !actionButtonRef?.contains(event.target)
            ) {
                isContextMenuOpen = false;
            }
        };

        document?.addEventListener("click", handleOutsideInteraction);
        document?.addEventListener("contextmenu", handleOutsideInteraction);

        return () => {
            document?.removeEventListener("click", handleOutsideInteraction);
            document?.removeEventListener("contextmenu", handleOutsideInteraction);
        };
    });

    function handleShare() {
        if (!navigator?.canShare?.call()) {
            console.error("Share functionality not available!");
            return;
        }

        navigator.share({
            title: `${file.label} on BiB-USTHB.com`,
            text: "BiB-USTHB is the unofficial student resource sharing platform for all usthb students",
            url: UrlJoin("https://bib-usthb.com/", previewUrl || "/"),
        });
    }

    function handleDownload() {
        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.download = file.label;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    let linkCopied = false;
    function handleCopyLink(_, item) {
        const fullUrl = UrlJoin("https://bib-usthb.com/", previewUrl || "/");
        navigator.clipboard.writeText(fullUrl).then(
            () => {
                console.log("Link copied to clipboard!");
                linkCopied = true;
                setTimeout(() => {
                    linkCopied = false;
                    isContextMenuOpen = false;
                }, 800);
            },
            (err) => {
                console.error("Failed to copy the link: ", err);
            },
        );
    }

    function handleOpenNewTab() {
        window.open(previewUrl, "_blank");
    }

    let nameCopied = false;
    function handleCopyFileName() {
        navigator.clipboard.writeText(file.label).then(
            () => {
                console.log("Filename copied to clipboard!");
                nameCopied = true;
                setTimeout(() => {
                    nameCopied = false;
                    isContextMenuOpen = false;
                }, 800);
            },
            (err) => {
                console.error("Failed to copy filename: ", err);
            },
        );
    }

    async function handlePrint() {
        const printJS = (await import("print-js")).default;
        if (/pdf/.test(file.mimeType)) {
            printJS(downloadUrl, "pdf");
        } else if (/image/.test(file.mimeType)) {
            printJS(downloadUrl, "image");
        } else {
            console.error("Unsupported file type for printing");
        }
    }

    let fileTypeIcon = "file";
    if (/image/.test(file.mimeType)) fileTypeIcon = "image";
    if (/video/.test(file.mimeType)) fileTypeIcon = "video";
    if (/audio/.test(file.mimeType)) fileTypeIcon = "audio";
    if (/pdf/.test(file.mimeType)) fileTypeIcon = "pdf";
    if (/zip|7z|compressed|archive|rar/i.test(file.mimeType)) fileTypeIcon = "zip";
    if (file.isDirectory) fileTypeIcon = "directory";

    let isContextMenuOpen = false;
    let actionButtonRef;
    let contextMenuRef;
    let contextMenuPosition = { x: 0, y: 0 };

    function handleContextMenu(event) {
        // event.stopPropagation();
        event.preventDefault();

        // Close any other open context menus first
        isContextMenuOpen = false;

        // Small delay to ensure clean state before opening new menu
        setTimeout(() => {
            isContextMenuOpen = true;

            const clickX = event.clientX;
            const clickY = event.clientY;

            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            const menuWidth = contextMenuRef?.offsetWidth || 150;
            const menuHeight = contextMenuRef?.offsetHeight || 200;

            contextMenuPosition = {
                x: Math.min(clickX, viewportWidth - menuWidth),
                y: Math.min(clickY, viewportHeight - menuHeight),
            };
        }, 0);
    }

    const menuGroups = [
        {
            items: [
                { label: "Open", action: () => goto(previewUrl), icon: "📄" },
                { label: "Open in New Tab", action: handleOpenNewTab, icon: "📑" },
            ],
        },
        {
            items: [
                ...(file.isDirectory ? [] : [{ label: "Download", action: handleDownload, icon: "⭳" }]),
                ...(isShareAvailable ? [{ label: "Share", action: handleShare, icon: "↗️" }] : []),
                ...(/pdf|image/.test(file.mimeType)
                    ? [{ label: "Print", action: handlePrint, icon: "🖨️" }]
                    : []),
            ],
        },
        {
            items: [
                { label: "Copy Link", action: handleCopyLink, icon: "🔗" },
                { label: "Copy Filename", action: handleCopyFileName, icon: "📋" },
            ],
        },
        // {
        //     items: [
                // { label: "File Info", action: () => goto(previewUrl + "&info=true"), icon: "ℹ️" },
        //     ],
        // },
    ];
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="file-item-container" on:contextmenu={handleContextMenu}>
    <a class="file-item-link" href={previewUrl}>
        <h2 class="file-title">
            <img class="file-icon" src="/images/{fileTypeIcon}.svg" alt="go to {file.path}" />
            {file.label}
        </h2>
        <span class="file-stats">
            {#if file.downloads}
                {file.downloads} download,
            {/if}
            {file.visits} visits
        </span>
        <span class="file-timestamp">
            Modified: {formatTimeAgo(new Date(file.lastModified))}
        </span>
        <button
            class="action-button"
            bind:this={actionButtonRef}
            on:click|preventDefault={() => {
                isContextMenuOpen = !isContextMenuOpen;
                if (isContextMenuOpen) {
                    const rect = actionButtonRef.getBoundingClientRect();
                    contextMenuPosition = {
                        x: rect.right - 100,
                        y: rect.top + rect.height,
                    };
                }
            }}
        >
            <img class="action-icon" src="/images/open.svg" alt="open menu" />
        </button>
    </a>

    {#if isContextMenuOpen}
        <div
            class="context-menu"
            bind:this={contextMenuRef}
            style="left: {contextMenuPosition.x}px; top: {contextMenuPosition.y}px;"
        >
            {#each menuGroups as group, groupIndex}
                {#if group.items.length > 0}
                    {#if groupIndex > 0}
                        <div class="menu-separator"></div>
                    {/if}
                    {#each group.items as item}
                        <button
                            class="menu-item"
                            on:click|preventDefault|stopPropagation={(event) => item.action(event, item)}
                        >
                            <span class="menu-item-icon">{item.icon}</span>
                            <span class="menu-item-label">{item.label}</span>
                            {#if item.label == "Copy Link" && linkCopied}
                                <span class="menu-item-state">copied!</span>
                            {/if}
                            {#if item.label == "Copy Filename" && nameCopied}
                                <span class="menu-item-state">copied!</span>
                            {/if}
                        </button>
                    {/each}
                {/if}
            {/each}
        </div>
    {/if}
</div>

<style>
    .file-item-container {
        position: relative;
        cursor: context-menu;
    }

    .file-item-link {
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
        height: 100%;
    }
    .file-item-link:hover:not(:has(.action-button:hover)) {
        background-color: #213249;
    }
    .file-title {
        color: var(--highlight-color);
        font-size: 18px;
        margin: 0;
        text-transform: capitalize;
        display: flex;
        align-items: center;
        gap: 10px;
        line-height: 120%;
        padding: 5px 0;
        word-break: break-all;
    }
    .file-icon {
        width: 30px;
        user-select: none;
        filter: invert(1);
        padding-bottom: 5px;
    }
    .file-stats,
    .file-timestamp {
        font-size: 14px;
        line-height: 140%;
    }
    .action-button {
        grid-row: -1 / 1;
        grid-column: -2 / -1;
        padding: 10px 5px 0 0;
        background: none;
        border: none;
        height: fit-content;
        cursor: pointer;
    }
    .action-icon {
        width: 30px;
        height: 30px;
        background-color: #1c2638;
        user-select: none;
        border-radius: 100%;
        padding: 4px;
        transition: background-color 300ms ease;
    }
    .action-button:hover .action-icon {
        background-color: #192335;
    }
    .context-menu {
        position: fixed;
        background-color: var(--background-1);
        color: var(--text-color);
        padding: 5px 0;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        z-index: 100;
        box-shadow: var(--search-glow) 2px 5px 15px -5px;
        min-width: 180px;
        border: solid #213249 1px;
    }
    .menu-separator {
        height: 1px;
        background-color: #213249;
        margin: 4px 0;
    }
    .menu-item {
        padding: 8px 15px;
        color: var(--text-color);
        text-decoration: none;
        width: 100%;
        text-align: start;
        background: none;
        border: none;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        white-space: nowrap;
        font-family: var(--main-font);
        font-size: var(--text-2);
    }
    .menu-item:hover {
        background-color: #213249;
    }
    .menu-item-icon {
        width: 20px;
        display: inline-flex;
        justify-content: center;
    }
    .menu-item-state {
        flex: 1;
        color: var(--highlight-color);
        font-size: 14px;
    }
    .menu-item-label {
        flex: 1;
    }
</style>
