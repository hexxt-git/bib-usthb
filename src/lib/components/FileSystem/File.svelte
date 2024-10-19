<script>
    export let file = {
        label: "unknown",
    };

    import { page } from "$app/stores";

    $: searchQueries = $page
        ? new URLSearchParams($page.url.search)
        : new URLSearchParams("");

    $: if (searchQueries.has("search")) {
        searchQueries.set("search", "");
        searchQueries = searchQueries;
    }

    $: fileUrl = `/files/${file.route}?${searchQueries.toString()}`;
</script>

<a href={fileUrl}>
    {file.label}
</a>

<style>
    a {
        background-color: var(--background-2);
        color: var(--text-1);
        border-radius: 10px;
        cursor: pointer;
        user-select: none;
        padding: 30px 50px;
        overflow-x: clip;
        text-decoration: none;
    }
</style>
