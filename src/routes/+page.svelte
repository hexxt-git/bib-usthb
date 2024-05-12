<script>
    import FileSystem from '/src/components/FileSystem.svelte';
    import Welcome from '/src/components/Welcome.svelte';

    /* generate the icons with npx @vite-pwa/assets-generator --preset minimal .\static\favicon.png */

</script>

<main>
    <Welcome />
    <FileSystem />

</main>

<style>
    main{
        margin: 0px;
        font-family: var(--main-font);
        background-color: var(--background-0);
        color: var(--text-color);
        min-height: 150vh;
    }
</style>