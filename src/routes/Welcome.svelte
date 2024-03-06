<script>

</script>
<main>
    <div>
        {#each new Array(30).fill(0).map((_,i)=>i) as x}
            <div style="
                position: absolute;
                width: 100vw;
                height: {40-x**1.2}px;
                bottom: {x*40}px;
                background: #00000018;
            "></div>
        {/each}
    </div>
    <div id="text-container">
        <h1>Welcome to <span>BiB-USTHB</span></h1>
        <h2>The unofficial student resource sharing website</h2>
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
    }
    h1{
        color: white;
        margin: 0;
        font-family: 'Rubik', sans-serif;
        font-size: 5rem;
        font-weight: 700;
    }
    h1 span{
        color: #052e05;
    }
    h2{
        color: white;
        margin: 0;
        font-family: 'Rubik', sans-serif;
        font-size: 2rem;
        font-weight: 500;
        letter-spacing: 1px;
    }
    #closing-arc{
        background: white;
        position: absolute;
        bottom: -50px;
        width: 100%;
        height: 100px;
        border-radius: 50% 50% 0 0;
    }
</style>