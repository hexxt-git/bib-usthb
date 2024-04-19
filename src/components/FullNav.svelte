<script>
	import { writable } from "svelte/store";
	import { switch_theme } from "./theme_store";
	import { fullnav } from "./fullnav_store";
    let close_nav = () => {
        fullnav.set(false)
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<nav>
    <div id="background"></div>
    <a on:click={close_nav} href="/">Home</a>
    
    <hr style="animation-delay: 0ms;">

    <a on:click={close_nav} href="/#faculties-container">Faculties</a>
    
    <hr style="animation-delay: 150ms;">

    <a on:click={close_nav} href="/contribute/">Contrinute</a>
    
    <hr style="animation-delay: 300ms;">

    <a on:click={close_nav} href="/feedback/">Feedback</a>
    
    <hr style="animation-delay: 450ms;">

    <!-- svelte-ignore a11y-missing-attribute -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <a on:click={switch_theme}>themes</a>
    
    <hr style="animation-delay: 600ms;">

    <a on:click={close_nav} href="/help/">Help</a>
</nav>

<style>
    nav{
        width: 100vw;
        margin-top: var(--nav-height);
        height: calc(100vh - var(--nav-height));
        position: fixed;
        top: 0;
        right: 0;
        z-index: 3;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: var(--nav-background);
        padding: 80px 0;
    }
    a{
        color: var(--highlight-color);
        text-decoration: none;
        user-select: none;
        cursor: pointer;
        font-family: var(--main-font);
        font-size: var(--text-0);
        text-transform: capitalize;
        flex-grow: 1;
        max-height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    hr{
        width: 0%;
        opacity: 0%;
        max-width: 400px;
        animation: set-width 450ms ease-out forwards ;
        border-color: var(--brand-color);
    }
    @keyframes set-width{
        0%{
            width: 0%;
            opacity: 100%;
        }
        100%{
            width: 60%;
            opacity: 100%;
        }
    }
</style>