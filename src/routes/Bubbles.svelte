<script> /* MAKE SURE THE PARENT ELEMENT DISPLAY IS RELATIVE*/
    export let opacity = 8;
    export let size = 16;
    export let width = 80;
    export let height = 50;
    export let z_index = 0;
    let dot_size = (x, y) => {
        return 16 - 0.9*x**0.5 - y*2;
    }
    console.table({opacity, size, width, height, z_index});
</script>

<div id="parent" style="z-index: {z_index}">
    <div id="child">
    {#each new Array(width).fill(0).map((_,i)=>i) as x}
    {#each new Array(height).fill(0).map((_,i)=>i) as y}
    <div style="
        background-color: hsla(0, 0%, 0%, {opacity}%);
        width: {dot_size(x, y)}px;
        height: {dot_size(x, y)}px;
        position: absolute;
        top: {4+y*(size+2)}px;
        left: {4+x*(size+2)}px;
        border-radius: 100%;
    "></div>
    {/each}
    {/each}
    </div>
</div>

<style>
    #parent{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }
    #child{
        position: relative;
        width: 100;
        height: 100%;
    }
</style>