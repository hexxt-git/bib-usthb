<main>
    <div id="text-container">
        <h1>hello world</h1>
        <h2>hello world</h2>
    </div>
</main>

<style>
    main{
        height: calc(100vh - var(--nav-height));
        position: relative;
    }
    #text-container{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>