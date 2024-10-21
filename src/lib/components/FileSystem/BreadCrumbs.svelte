<script>
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
    let enableBack;
    // $: back = $page.data.path.split("/").slice(0, -1).join("");
    $: enableBack = $page.data.path !== "/";
</script>

<nav>
    <div id="breadcrumbs">
        {#each breadCrumbArray as { href, label }, index}
            &nbsp;{index !== 0 ? "/" : ""} <a {href}>{label}</a>
        {/each}
    </div>
    <div id="buttons">
        <a class={enableBack ? "" : "disabled"}>
            <img src="/images/arrow.svg" alt="arrow" class="reverse" />
        </a>
        <a>
            <img src="/images/arrow.svg" alt="arrow" />
        </a>
    </div>
</nav>

<style>
    nav {
        display: flex;
        justify-content: space-between;
        align-items: end;
    }
    #breadcrumbs a {
        color: var(--brand-color);
        text-decoration: none;
        font-size: var(--text-0);
    }
    #breadcrumbs a:hover {
        text-decoration: underline;
    }
    #buttons a {
        padding: 0 10px;
    }
    #buttons a img {
        width: 22px;
        scale: 1;
        transition: scale 300ms ease;
    }
    #buttons a:hover img {
        scale: 1.1;
    }
    .reverse {
        transform: scaleX(-1);
    }
    .disabled {
        opacity: 0.6;
        cursor: default;
    }
</style>
