<script>
	import { onMount } from "svelte";
    import Bubbles from "./Bubbles.svelte";
    let current_theme = ''
    onMount(()=>{
        if(typeof window !== 'undefined'){
            if(localStorage.getItem("theme") == null){
                localStorage.setItem("theme", "dark")
            }
            current_theme = localStorage.getItem("theme")
            document.documentElement.setAttribute('theme', current_theme)
        }
    })

    let switch_mode = ()=>{
        localStorage.setItem("theme", localStorage.getItem("theme") == "dark" ? "light" : "dark");
        location.reload()
    }
</script>

<nav>
    <Bubbles z_index=-1 width={150} height={10} opacity=5 />
    <a id="nav-logo" href="/">BiB-USTHB</a>
    <div>
    <a href="/#faculties-page">faculties</a>
    <!-- <a href="/#footer">creators</a> -->
    <a href="/help">help</a>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span on:click={switch_mode}> {current_theme == 'dark' ? 'light' : 'dark'} mode </span>
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
        background-color: var(--background-1);
        color: var(--text-color);
        font-size: var(--text-1);
        box-shadow: var(--strong-shadow);
        overflow: hidden;
    }
    div{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }
    a, span{
        cursor: pointer;
        color: var(--text-color);
        font-size: var(--text-0);
        text-decoration: transparent underline 1px;
        transition: text-decoration 130ms ease-in-out;
    }
    a:hover, span:hover{
        text-decoration: var(--text-color) underline 2px;
    }
    #nav-logo{
        min-width: 210px;
        color: var(--brand-color);
        font-family: var(--title-font);
        font-weight: 700;
        font-size: 2.25em;
        user-select: none;
        cursor: pointer;
        text-decoration: none;
        padding-top: 3px;
    }
    #nav-contribute{
        color: var(--background-0);
        background-color: var(--brand-color);
        padding: 7px 20px;
        width: 140px;
        height: 42px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: var(--element-radius);
        user-select: none;
        cursor: pointer;
        text-decoration: none;
        font-weight: 500;
        font-size: var(--text-0);
        letter-spacing: 1px;
    }
    @media (max-width: 700px), (max-aspect-ratio: 3/4) {
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
            font-size: 2em;
        }
        #nav-contribute{
            padding: 7px 15px;
        }
    }
</style>