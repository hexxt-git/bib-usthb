<script>
	import { onMount } from "svelte";
    import Bubbles from "./Bubbles.svelte";
    let current_theme = ''
    onMount(()=>{
        if(typeof window !== 'undefined'){
            if(localStorage.getItem("theme") == null){
                localStorage.setItem("theme", "light")
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
<footer id="footer">
    <Bubbles offset={5} flip_y={1} height={8} opacity={4}/>
    <div>
        made by <a href="https://9EED.github.io/" target="_blank"> Zeghdani Salah </a> and <a href="https://laindev.me/" target="_blank"> Aymen charfaoui </a>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div id="mobile-links">
    <div on:click={switch_mode}> switch website theme to <span>{current_theme == 'dark' ? 'light' : 'dark'} mode </span></div>
    <div>
        having an issues? visit our <a href="./help">help</a> page
    </div>
    </div>
    <div>
        kept alive by your <a href="./contribute/">contributions</a>
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
