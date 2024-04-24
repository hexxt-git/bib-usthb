<script>
    import Bubbles from "./subcomponents/Bubbles.svelte";
    import { switch_theme, next_theme } from "./theme_store.js";
    import { close_nav, switch_nav } from "./fullnav_store";

    let try_close_nav = e => {
        if(e.target.id !== 'fullnav-toggle') close_nav()
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<nav on:click={try_close_nav}>
    <Bubbles z_index=-1 width={150} height={10} opacity=7 />
    
    <a id="nav-logo" href="/">BiB-USTHB</a>
    
    <div id="desktop-links">
        <a href="/#">files</a>
        <a href="/help">help</a>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <span on:click={switch_theme} on:keypress={switch_theme} tabindex="0"> {$next_theme} mode </span>
    </div>
    
    <div id="right">
        <a id="nav-contribute" href="/contribute/">contribute</a>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <button id="fullnav-toggle" on:click={switch_nav}>
            ≡
        </button>
    </div>
</nav>

<style>
    nav{
        z-index: 5;
        position: sticky;
        top: 0;
        height: var(--nav-height);
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 50px;
        background-color: var(--background-1);
        color: var(--text-color);
        font-size: var(--text-1);
        font-family: var(--main-font);
        box-shadow: var(--strong-shadow);
        overflow: hidden;
    }
    #desktop-links{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 30px;
    }
    a, span{
        cursor: pointer;
        color: var(--highlight-color);
        font-size: var(--text-0);
        text-decoration: transparent underline 1px;
        transition: text-decoration 130ms ease-in-out;
    }
    a:hover, span:hover{
        text-decoration: underline 2px;
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
        width: 140px;
        height: 40px;
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
    #fullnav-toggle{
        color: var(--background-0);
        background-color: var(--brand-color);
        border-radius: var(--element-radius);
        height: 40px;
        width: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
        cursor: pointer;
        font-size: 32px;
        font-family: monospace;
        padding-bottom: 2px;
        border: none;
    }
    #right{
        display: flex;
        gap: 10px;
    }
    @media (max-width: 800px), (max-aspect-ratio: 3/4) {
        #desktop-links, #nav-contribute{
            display: none;
        }
        nav{
            padding: 0 20px 0 30px;
        }
    }
</style>