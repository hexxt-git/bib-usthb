<script>
    let opacity = 8;
    let size = 30;
    let offset = 1;
    let width = 80;
    let height = 15;
    let flip_y = 0;
    let dot_size = (x, y) => {
        return size - 0.9*x**0.6 - (-1)**flip_y * y*1.5;
    }
</script>
<main>
    <div id="bubbles">
        {#each new Array(width).fill(0).map((_,i)=>i) as x}
        {#each new Array(height).fill(0).map((_,i)=>i) as y}
        <div style="
            background-color: hsla(0, 0%, 0%, {opacity}%);
            width: {dot_size(x, y)}px;
            height: {dot_size(x, y)}px;
            position: absolute;
            bottom: {y*(size+offset)-12}px;
            left: {x*(size+offset)+(y%2)*(size+offset)/2-12}px;
            border-radius: 100%;
        "></div>
        {/each}
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