<script>
    export let spacer = true;
</script>

<nav>
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
{#if spacer}
    <div id="spacer"></div>
{/if}

<style>
    #spacer{
        height: var(--nav-height);
    }
    nav{
        z-index: 1;
        position: fixed;
        top: 0px;
        left: 0px;
        padding-top: 5px;
        height: var(--nav-height);
        width: 100vw;
        display: flex;
        justify-content: space-between;
        background-color: white;
        box-shadow: var(--strong-shadow);
        overflow-x: auto;
    }
    #nav-left{
        display: flex;
        align-items: center;
        gap: 20px;
        padding-left: 30px;
    }
    #nav-right{
        display: flex;
        align-items: center;
        gap: 20px;
        padding-right: 45px;
    }
    #nav-logo{
        min-width: 210px;
        color: var(--barnd-green);
        font-family: 'Rubik';
        font-weight: 700;
        font-size: 30px;
        user-select: none;
        cursor: pointer;
        transition: text-shadow 200ms ease-in-out;
        -webkit-transition: text-shadow 200ms ease-in-out;
        -moz-transition: text-shadow 200ms ease-in-out;
        -ms-transition: text-shadow 200ms ease-in-out;
        -o-transition: text-shadow 200ms ease-in-out;
        text-decoration: none;
    }
    #nav-logo:hover{
        text-shadow: var(--weak-glow);
    }
    #nav-contribute{
        color: white;
        background-color: var(--barnd-green);
        width: 120px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        -ms-border-radius: 8px;
        -o-border-radius: 8px;
        user-select: none;
        cursor: pointer;
        transition: box-shadow 200ms ease-in-out;
        -webkit-transition: box-shadow 200ms ease-in-out;
        -moz-transition: box-shadow 200ms ease-in-out;
        -ms-transition: box-shadow 200ms ease-in-out;
        -o-transition: box-shadow 200ms ease-in-out;
        text-decoration: none;
        flex-shrink: 1;
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