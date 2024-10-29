<script>
    import { onMount } from "svelte";

    import "./style.css";

    import NotificationSystem from "$lib/components/NotificationSystem.svelte";
    import ConfettiSystem from "$lib/components/ConfettiSystem.svelte";
    import LoadingScreen from "$lib/components/LoadingScreen.svelte";
    import Nav from "$lib/components/Nav.svelte";
    import Footer from "$lib/components/Footer.svelte";

    let mounted = true;
    setTimeout(() => (mounted = false), 0);

    onMount(() => {
        setTimeout(() => {
            mounted = true;
        }, 500);
    });

    import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
    injectSpeedInsights();

    import { inject } from "@vercel/analytics";
    inject();

    /*
    import { notify } from "$lib/components/notification_store.js";
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

<svelte:head>
    <title>BiB-USTHB</title>
</svelte:head>

{#if !mounted}
    <LoadingScreen />
{/if}

<Nav />

<NotificationSystem />
<ConfettiSystem />

<slot />

<Footer />
