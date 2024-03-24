<script>
    import Bubbles from "./Bubbles.svelte";
    import { theme_store } from "./theme_store.js";
    import { switch_theme } from "./theme_store.js";
</script>
<footer id="footer">
    <Bubbles offset={5} flip_y={1} height={8} opacity={4}/>
    <div>
        made by <a href="https://9EED.github.io/" target="_blank"> Zeghdani Salah </a> and <a href="https://laindev.me/" target="_blank"> Aymen charfaoui </a>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div id="mobile-links">
    <div on:click={switch_theme}> switch website theme to <span>{$theme_store == 'dark' ? 'light' : 'dark'} mode </span></div>
    <div>
        having an issues? visit our <a href="./help">help</a> page
    </div>
    </div>
    <div>
        kept alive by your <a href="/contribute/">contributions</a>
    </div>
    <div>
        open-sourced on <a href="https://github.com/9EED/bib-usthb" target="_blank">github</a>
    </div>
</footer>

<style>
    footer{
        padding: 30px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: var(--background-1);
        box-shadow: var(--strong-shadow);
        position: relative;
        overflow: hidden;
        color: var(--text-color);
    }
    footer a, footer span{
        color: var(--brand-color);
        text-decoration: none;
    }
    footer a:hover, footer span:hover{
        text-decoration: underline;
    }
    @media (min-width: 800px), (min-aspect-ratio: 3/4){
        #mobile-links{
            display: none;
        }
    }
</style>
