<script>
    import File from '/src/components/subcomponents/File.svelte'
</script>

<main>
    <h1>File Finder:</h1>
    <div id="container">
        <div id="files">
            <File />
            <File />
            <File />
            <File />
            <File />
            <File />
            <File />
            <File />
        </div>
        <div id="settings">
            settings
        </div>
    </div>
</main>

<style>
    main{
        margin: 50px var(--side-margin) 100px var(--side-margin);
    }
    h1{
        margin: 0 auto 10px auto;
        width: fit-content;
        padding: 20px 0px 0px 0px;
        text-decoration: var(--brand-color) underline;
        user-select: none;
        cursor: pointer;
        font-family: var(--title-font);
        font-size: var(--title-1);
        color: var(--title-color);
    }
    #container{
        background-color: var(--background-1);
        border-radius: var(--window-radius);
        height: 650px;
        position: relative;
    }
    #files{
        display: flex;
        gap: 10px;
        padding: 20px 30px;
        flex-wrap: wrap;
    }
    #settings{
        position: absolute;
        bottom: 0;
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
    }
</style>