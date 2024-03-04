<script>
    import Bubbles from "./Bubbles.svelte";
</script>

<nav>
    <Bubbles z_index=-1 width={150} height={10} opacity=5 />
    <div id="nav-left">
        <a id="nav-logo" href="/">TresorUSTHB</a>
        <a class="nav-link" href="/#faculties-page" id="nav-faculties">faculties</a>
        <a class="nav-link" href="/#footer" id="nav-creators">creators</a>
    </div>
    <div id="nav-right">
        <a class="nav-link" href="/help" id="nav-creators">help</a>
        <!--<input type="search" placeholder="search..." id="nav-search">-->
        <a id="nav-contribute" href="/contribute">contribute</a>
    </div>
</nav>

<style>
    nav{
        z-index: 1;
        position: sticky;
        top: 0px;
        left: 0px;
        padding-top: 5px;
        height: var(--nav-height);
        width: calc(100vw -9px);
        display: flex;
        justify-content: space-between;
        background-color: white;
        box-shadow: var(--strong-shadow);
        overflow: hidden;
    }
    #nav-left{
        display: flex;
        align-items: center;
        gap: 30px;
        padding-left: 50px;
    }
    #nav-right{
        display: flex;
        align-items: center;
        gap: 40px;
        padding-right: 80px;
    }
    #nav-logo{
        min-width: 210px;
        color: var(--barnd-green);
        font-family: 'Rubik';
        font-weight: 700;
        font-size: 35px;
        user-select: none;
        cursor: pointer;
        transition: text-shadow 200ms ease-in-out;
        text-decoration: none;
        transform: translateY(-2px);
    }
    #nav-logo:hover{
        text-shadow: var(--weak-glow);
    }
    #nav-contribute{
        color: white;
        background-color: var(--barnd-green);
        width: 140px;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        user-select: none;
        cursor: pointer;
        transition: box-shadow 200ms ease-in-out;
        text-decoration: none;
        flex-shrink: 1;
        font-size: 18px;
    }
    #nav-contribute:hover{
        box-shadow: var(--strong-glow);
    }
    /*#nav-search{
        width: 150px;
        height: 30px;
        border: #666 solid 1.5px;
        box-shadow: var(--weak-shadow);
        outline: none;
        padding: 0px 8px;
        border-radius: 8px;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        -ms-border-radius: 8px;
        -o-border-radius: 8px;
        color: var(--barnd-green-darker);
        font-family: 'Rubik';
        font-size: 15px;
        font-weight: 500;
        flex-shrink: 1;
    }*/
    .nav-link{
        cursor: pointer;
        text-decoration: none;
        color: black;
    }
    .nav-link:hover{
        text-decoration: underline;
    }
    @media (max-width: 700px), (orientation: portrait) {
        #nav-faculties, #nav-creators/*, #nav-search*/{
            display: none;
        }
    }
    @media (max-width: 500px) {
        nav{
            justify-content: space-evenly;
        }
        #nav-left, #nav-right{
            padding: 0px;
        }
    }
</style>