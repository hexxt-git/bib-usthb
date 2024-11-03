<script>
    import { page } from "$app/stores";
    import Main from "$lib/items/Main.svelte";
</script>

<Main>
    <h1>{$page.status}: {$page.error.message}</h1>
    <p>Something went wrong. Please try again later.</p>
</Main>

<style>
    h1 {
        color: #ff6b6b;
        font-family: Arial, sans-serif;
        text-align: center;
        font-size: 20px;
        padding-top: 20%;
    }
    p {
        color: #555;
        font-family: Arial, sans-serif;
        text-align: center;
    }
</style>
