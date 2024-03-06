<script>
    function radius(x, y){
        let x0 = (x-70)/20;
        let y0 = (y-5)/20;
        let a0 = 0;
        let b0 = 0;
        let inf = false
        let i = 0;
        while(!inf){
            let a = a0*a0 - b0*b0 + x0;
            let b = 2*a0*b0 + y0;
            a0 = a;
            b0 = b;
            i++;
            if(a0*a0 + b0*b0 > 4 || i > 100){
                inf = true;
            }
        }
        return i > 20 ? i/10-Math.random()*1 : Math.random()*4;
    }
    </script>
    <main>
        <div>
            {#each new Array(50).fill(0).map((_,i)=>i) as y}
            {#each new Array(80).fill(0).map((_,i)=>i) as x}
            <div style="
                    position: absolute;
                    background: #0000000b;
                    left: {x*20}px;
                    top: {y*20}px;
                    padding: {radius(x,y)}px;
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