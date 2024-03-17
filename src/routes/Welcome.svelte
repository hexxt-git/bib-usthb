<script>
    import FractalBackground from "./FractalBackground.svelte";
    import SearchBar from "./SearchBar.svelte";
</script>
<main>
    <FractalBackground />
    <div id="text-container">
        <h1>Welcome to <div>BiB-USTHB</div></h1>
        <h2>The unofficial student resource sharing website</h2>
        <SearchBar />
    </div>
    <div id="closing-arc"></div>
</main>

<style>
    main{
        height: calc(100vh - var(--nav-height));
        position: relative;
        background-color: #57cd3f;
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
        gap: 5px;
        padding-top: 60px;
        text-align: center;
    }
    h1{
        color: white;
        margin: 0;
        font-family: 'Rubik', sans-serif;
        font-size: 5rem;
        font-weight: 700;
    }
    h1 div{
        color: #052e05;
        display: inline-block;
    }
    h2{
        color: white;
        margin: 0;
        font-family: 'Rubik', sans-serif;
        font-size: 2rem;
        font-weight: 500;
        letter-spacing: 1px;
        padding: 0 30px;
    }
    #closing-arc{
        background: white;
        position: absolute;
        bottom: -50px;
        width: 100%;
        height: 100px;
        border-radius: 50% 50% 0 0;
    }
    @media (max-width: 800px), (orientation: portrait){
        #text-container{
            padding-top: 0;
            gap: 20px;
        }
        h1{
            font-size: 3rem;
            display: flex;
            flex-direction: column;
        }
        h2{
            font-size: 2rem;
        }
    }
</style>