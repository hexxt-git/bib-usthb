<script>
    import SearchBar from "./subcomponents/SearchBar.svelte";
</script>
<main>
    <div id="background">
        <img src="/images/FractalBackgroundSmall.png" alt="">
    </div>
    <div id="text-container">
        <h1>Welcome to <span>BiB-USTHB</span></h1>
        <h2>The unofficial student resource sharing website</h2>
        <SearchBar />
    </div>
    <div id="closing-arc"></div>
</main>

<style>
    #background{
        position: absolute;
        top: 0;
        left: 0;
    }
    #background img{
        height: 100%;
        min-width: 100%;
        mix-blend-mode: darken;
        opacity: var(--fractal-opacity);
    }
    main{
        height: calc(100vh - var(--nav-height));
        position: relative;
        background-color: var(--brand-color-weak);
        overflow: hidden;
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
        padding-top: 100px;
        text-align: center;
    }
    h1{
        color: white;
        margin: 0;
        font-family: var(--title-font);
        font-size: 5rem;
        font-weight: 700;
    }
    h1 span{
        color: var(--first-title-color);
        display: inline-block;
    }
    h2{
        color: white;
        margin: 0;
        font-family: var(--title-font);
        font-size: 2em;
        font-weight: 500;
        letter-spacing: 1px;
        padding: 0 30px;
    }
    #closing-arc{
        background: var(--background-0);
        position: absolute;
        bottom: -50px;
        width: 100%;
        height: 100px;
        border-radius: 50% 50% 0 0;
    }
    @media (max-width: 800px), (orientation: portrait){
        #text-container{
            padding-bottom: 200px;
            gap: 10px;
        }
        h1{
            font-size: 3rem;
            display: flex;
            flex-direction: column;
        }
        h2{
            font-size: 1.5em;
            max-width: 80%;
        }
    }
</style>