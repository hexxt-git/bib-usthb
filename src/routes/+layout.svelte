<script>
    import { onMount } from "svelte";
    import { fullnav } from "/src/components/fullnav_store.js";

    import NotificationSystem from "/src/components/NotificationSystem.svelte";
    import ConfettiSystem from "/src/components/ConfettiSystem.svelte";
    import LoadingScreen from "/src/components/LoadingScreen.svelte";
    import Nav from "/src/components/Nav.svelte";
    import Footer from "/src/components/Footer.svelte";
    import FullNav from "/src/components/FullNav.svelte";

    let mounted = false;

    onMount(() => {
        setTimeout(() => (mounted = true, 100));
    });

    import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
    injectSpeedInsights();

    import { inject } from "@vercel/analytics";
    inject();

    /*
    import { notify } from "/src/components/notification_store.js";
    onMount(()=>{
        setTimeout(()=>
            notify({
                state: "notification",
                message: "welcome amongst the first visitors of this website, please be patient as we are still in development.",
                duration: 20*1000
            }),
        1000);
        setTimeout(()=>
            notify({
                state: "notification",
                message: "if you notice a module or faculty missing, please contact us through the support page bib-usthb.com/feedback",
                duration: 20*1000
            }),
        2000);
    });*/
</script>

{#if !mounted}
    <LoadingScreen />
{/if}
<Nav />
{#if $fullnav}
    <FullNav />
{:else}
    <NotificationSystem />
    <ConfettiSystem />
{/if}
<slot />
<Footer />

<style>
    :root {
        --brand-color: #4381df;
        --brand-color-weak: #1f2f44;
        --brand-color-weaker: #16537c;

        --success-color: #29af1c;
        --error-color: #ca4c48;
        --info-color: #4c58c0;

        --background-0: #171e2c;
        --background-1: #1b2636;
        --background-2: #1c2b3f;
        --background-3: #282c30;
        --nav-background: #0e1320f8;

        --strong-shadow: #6662 0px 0px 50px;
        --medium-shadow: #0002 0px 5px 10px;
        --weak-shadow: #0003 0px 0px 14px;
        --window-shadow: #364f7522 0 5px 10px;
        --item-shadow: #05070709 0 0 10px;

        --text-color: #caf7e4;
        --text-color-weak: #7a888b;
        --title-color: #ffffff;
        --first-title-color: #71abee;
        --highlight-color: #f7f7f7;

        --title-font: "Rubik", sans-serif;
        --main-font: "Nunito", sans-serif;

        --title-1: 2em;
        --title-2: 1.5em;
        --title-3: 1em;

        --nav-height: 70px;
        --side-margin: 120px;

        --text-0: 1.2em;
        --text-1: 1em;
        --text-2: 0.9em;

        --window-radius: 40px;
        --element-radius: 25px;

        --icon-filter: invert(0.8);
        --icon-filter-weak: invert(0.4);
        --green-icons-filter: hue-rotate(114deg);

        --clear-notification-color: #1c2c3b;
        --clear-notification-border: #114147;
        --fractal-opacity: 0.15;
    }
    *::selection {
        background-color: #27b1d4bb;
        color: white;
        text-shadow: none;
    }
    @media screen and (max-width: 700px) {
        :root {
            --side-margin: 20px;
            --nav-height: 60px;
        }
    }
    * {
        scrollbar-color: #279dd4 #171c27;
    }
    :global(body) {
        background: var(--background-0);
    }
</style>
