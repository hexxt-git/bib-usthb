<script>
    export let file = {
        label: "unknown",
    };

    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    $: searchQueries = $page 
        ? new URLSearchParams($page.url.search)
        : new URLSearchParams("");

    $: if (searchQueries.has('search')) {
        searchQueries.delete('search');
    }

    $: fileUrl = `/files/${file.label}?${searchQueries.toString()}`;

    function handleNavigation(event) {
        event.preventDefault();
        const inMain = !$page.url.pathname.match("files");
        const currentScroll = window.scrollY;
        goto(fileUrl).then(() => {
            if(!inMain) window.scrollTo(0, currentScroll);
        });
    }
</script>

<a href={fileUrl} on:click={handleNavigation}>
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