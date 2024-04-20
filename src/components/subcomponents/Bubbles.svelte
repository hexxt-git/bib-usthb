<script> /* MAKE SURE THE PARENT ELEMENT DISPLAY IS RELATIVE*/
    export let opacity = 8;
    export let size = 16;
    export let offset = 2;
    export let width = 120;
    export let height = 10;
    export let z_index = 0;
    export let flip_y = 0;
    let dot_size = (x, y) => {
        return size - 0.9*x**0.5 - (-1)**flip_y * y*2;
    }
    //console.table({opacity, size, width, height, z_index});
</script>

<div id="parent" style="z-index: {z_index}">
    <div id="child">
    {#each new Array(width).fill(0).map((_,i)=>i) as x}
    {#each new Array(height).fill(0).map((_,i)=>i) as y}
    <div style="
        background-color: hsla(0, 0%, 0%, {opacity}%);
        width: {dot_size(x, y)}px;
        height: {dot_size(x, y)}px;
        top: {4+y*(size+offset)}px;
        left: {4+x*(size+offset)}px;
    " class="dot"></div>
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
    .dot{
        border-radius: 100%;
        position: absolute;

    }
</style>