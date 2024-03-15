<script>
    import Bubbles from "./Bubbles.svelte";
</script>

<footer id="footer">
    <Bubbles offset={5} flip_y={1} height={8} opacity={4}/>
    <div>
        made by <a href="https://9EED.github.io/" target="_blank"> Zeghdani Salah </a> and <a href="https://laindev.me/" target="_blank"> Aymen charfaoui </a>
    </div>
    <div>
        kept alive by your <a href="https://google.com" target="_blank">contributions</a>
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
        background-color: var(--off-white);
        box-shadow: var(--strong-shadow);
        position: relative;
        overflow: hidden;
    }
    footer a{
        color: var(--brand-green);
        text-decoration: none;
    }
    footer a:hover{
        text-decoration: underline;
    }
</style>
