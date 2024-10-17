<script>
    import Bubbles from "./subcomponents/Bubbles.svelte";
</script>

<nav>
    <Bubbles z_index="-1" width={150} height={10} opacity="7" />

    <a id="nav-logo" href="/">BiB-USTHB</a>

    <div id="right">
        <a class="nav-button" href="/help">?</a>
        <a class="nav-button" href="/contribute">contribute</a>
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
        overflow: hidden;
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
    #right{
        display: flex;
        gap: 10px;
    }
    .nav-button {
        color: var(--background-0);
        background-color: var(--brand-color);
        height: 40px;
        padding: 0 15px;
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
    @media (max-width: 800px), (max-aspect-ratio: 3/4) {
        nav {
            padding: 0 20px 0 30px;
        }
    }
</style>
