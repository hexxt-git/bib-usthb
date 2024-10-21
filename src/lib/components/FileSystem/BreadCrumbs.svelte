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
</script>

<div id="breadcrumbs">
    {#each breadCrumbArray as { href, label }, index}
        &nbsp;{index !== 0 ? "/" : ""} <a {href}>{label}</a>
    {/each}
</div>

<style>
    #breadcrumbs a {
        color: var(--brand-color);
        text-decoration: none;
    }
    #breadcrumbs a:hover {
        text-decoration: underline;
    }
</style>
