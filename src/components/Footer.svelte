<script>
    import Bubbles from "./subcomponents/Bubbles.svelte";
    import { theme_store } from "./theme_store.js";
    import { switch_theme } from "./theme_store.js";
</script>
<footer id="footer">
    <Bubbles offset={5} flip_y={1} height={8} opacity={4}/>
    <div>
        made by <a href="https://9EED.github.io/" target="_blank"> Zeghdani Salah </a> and <a href="https://laindev.me/" target="_blank"> Aymen charfaoui </a>
    </div>
    <div>
        kept alive by your <a href="/contribute/">contributions</a> and <a href="/feedback/">feedback</a>
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
        gap: 5px;
        background-color: var(--background-1);
        box-shadow: var(--strong-shadow);
        position: relative;
        overflow: hidden;
        color: var(--highlight-color);
        font-family: var(--main-font);
        font-size: var(--text-1);
    }
    footer a{
        color: var(--brand-color);
        text-decoration: none;
    }
    footer a:hover{
        text-decoration: underline;
    }
</style>
