<script>
    import Bubbles from "./Bubbles.svelte";
</script>

<nav>
    <Bubbles z_index=-1 width={150} height={10} opacity=5 />
    <a id="nav-logo" href="/">BiB-USTHB</a>
    <div>
    <a class="nav-link" href="/#faculties-page">faculties</a>
    <a class="nav-link" href="/#footer">creators</a>
    <a class="nav-link" href="/help">help</a>
    </div>
    <!--<input type="search" placeholder="search..." id="nav-search">-->
    <a id="nav-contribute" href="/contribute">contribute</a>
</nav>

<style>
    nav{
        z-index: 1;
        position: sticky;
        top: 0;
        height: var(--nav-height);
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 50px;
        background-color: var(--background-0);
        color: var(--text-color);
        font-size: var(--text-1);
        box-shadow: var(--strong-shadow);
        font-family: var(--main-font);
        overflow: hidden;
    }
    div{
        display: flex;
        justify-content: center;
        gap: 20px;
    }
    .nav-link{
        cursor: pointer;
        text-decoration: none;
        color: var(--text-color);
        font-size: var(--text-0);
        text-decoration: transparent underline 1px;
        transition: text-decoration 130ms ease-in-out;
    }
    .nav-link:hover{
        text-decoration: var(--text-color) underline 2px;
    }
    #nav-logo{
        min-width: 210px;
        color: var(--brand-color);
        font-family: var(--title-font);
        font-weight: 700;
        font-size: 35px;
        user-select: none;
        cursor: pointer;
        text-decoration: none;
        padding-top: 3px;
    }
    #nav-contribute{
        color: white;
        background-color: var(--brand-color);
        padding: 7px 20px;
        width: 140px;
        height: 42px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 17px;
        user-select: none;
        cursor: pointer;
        text-decoration: none;
        font-weight: 500;
        font-size: 1.2rem;
        letter-spacing: 1px;
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
        color: var(--brand-green-darker);
        font-family: 'Rubik';
        font-size: 15px;
        font-weight: 500;
        flex-shrink: 1;
    }*/
    @media (max-width: 700px), (orientation: portrait) {
        div{
            display: none;
        }
    }
    @media (max-width: 500px) {
        nav{
            padding: 0px 20px;
        }
        #nav-logo{
            min-width: 180px;
            font-size: 30px;
        }
        #nav-contribute{
            padding: 7px 15px;
            font-size: 1rem;
        }
    }
</style>