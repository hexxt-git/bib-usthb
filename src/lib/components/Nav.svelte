<script>
    import Contribute from "./subcomponents/Contribute.svelte";
</script>

<nav>
    <div id="background"></div>

    <a id="nav-logo" href="/">BiB-USTHB</a>

    <div id="right">
        <Contribute />
        <a class="nav-button" href="/help">?</a>
    </div>
</nav>

<style>
    nav {
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
        overflow-x: clip;
    }
    #background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(/images/backgrounds/dots.webp);
        mix-blend-mode: darken;
        opacity: 8%;
        background-size: 1500px cover;
        z-index: -1;
    }
    #nav-logo {
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
    #right {
        display: flex;
        gap: 10px;
    }
    .nav-button {
        color: black;
        background-color: var(--brand-color);
        height: 35px;
        padding: 0 13px;
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
        box-shadow: var(--search-glow) 0 10px 5px -5px;
        transition: 400ms ease;
    }
    .nav-button:hover {
        box-shadow: #3687f01c 0 5px 5px 5px;
    }
    @media (max-width: 800px), (max-aspect-ratio: 3/4) {
        nav {
            padding: 0 20px 0 30px;
        }
    }
</style>
