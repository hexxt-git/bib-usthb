<script>
    function madelbrot(x, y){
        let max = 20;
        let a0 = 0;
        let b0 = 0;
        let i = 0;
        while(i < max && a0*a0 + b0*b0 < 4){
            let a = a0*a0 - b0*b0 + x;
            let b = 2*a0*b0 + y;
            a0 = a;
            b0 = b;
            i++;
        }
        return i / max;
    }
    function julia(x, y){
        let max = 20;
        let a0 = x;
        let b0 = y;
        let i = 0;
        while(i < max && a0*a0 + b0*b0 < 4){
            let a = a0*a0 - b0*b0 - 0.8;
            let b = 2*a0*b0 + 0.156;
            a0 = a;
            b0 = b;
            i++;
        }
        return i / max;
    }
    function radius(x, y){
        let madelx = (x-80)/20;
        let madely = (y-15)/20;
        let juliax = (x-15)/15;
        let juliay = (y-35)/15;
        let result = 10 * (madelbrot(madelx, madely) + julia(juliax, juliay));
        return result > 10 ? 10 : result < 4 ? Math.random()*4 : result;
    }
</script>

<div>
    {#each new Array(100).fill(0).map((_,i)=>i) as x}
    {#each new Array(80).fill(0).map((_,i)=>i) as y}
    <div style="
            position: absolute;
            background: #00000020;
            left: {x*20}px;
            top: {y*20}px;
            padding: {radius(x,y)}px;
            border-radius: 100%;
        "></div>
    {/each}
    {/each}
</div>