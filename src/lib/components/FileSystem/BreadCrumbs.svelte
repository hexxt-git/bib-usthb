<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";

    $: route = $page.data.path;

    let breadCrumbArray = [{ href: "/", label: "bib-usthb" }];
    $: if (route) {
        breadCrumbArray = [{ href: "/files", label: "bib-usthb" }];
        for (let directory of route?.split("/") ?? []) {
            if (!directory) continue;
            breadCrumbArray.push({
                href: (breadCrumbArray.at(-1)?.href ?? "/files") + "/" + directory,
                label: directory,
            });
            breadCrumbArray = breadCrumbArray;
        }
    }

    function goBack() {
        // i give up on making a custom method
        window.history.back();
    }
    function goForward() {
        window.history.forward();
    }
</script>

<nav>
    <div id="breadcrumbs">
        {#each breadCrumbArray as { href, label }, index}
            &nbsp;{index !== 0 ? "/" : ""}
            <a {href}>{label}</a>
        {/each}
    </div>
    <div id="buttons">
        <button on:click={goBack}>
            <img src="/icons/navigation/arrow.svg" alt="arrow" class="reverse" />
        </button>
        <button on:click={goForward}>
            <img src="/icons/navigation/arrow.svg" alt="arrow" />
        </button>
    </div>
</nav>

<style>
    nav {
        display: flex;
        justify-content: space-between;
        align-items: end;
        max-width: 100%;
    }
    #breadcrumbs {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        max-width: 100%;
        gap: 3px;
    }
    #breadcrumbs a {
        color: var(--brand-color);
        text-decoration: none;
        font-size: var(--text-0);
        max-width: 100%;
        word-break: break-all;
        
        display: block;
    }
    #breadcrumbs a:hover {
        text-decoration: underline;
    }
    #buttons button {
        padding: 0 10px;
        background: none;
        border: none;
        cursor: pointer;
    }
    #buttons button img {
        width: 26px;
        scale: 1;
        transition: scale 300ms ease;
    }
    #buttons button:hover img {
        scale: 1.1;
    }
    .reverse {
        transform: scaleX(-1);
    }
    button:disabled {
        opacity: 0.6;
        cursor: default;
    }
</style>
