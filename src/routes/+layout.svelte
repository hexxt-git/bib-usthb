<script>
    import { theme_store } from "/src/components/theme_store.js"
    import { onMount } from "svelte";
    import { notify } from "/src/components/notification_store.js"
    import { fullnav } from "/src/components/fullnav_store.js"

    import NotificationSystem from "/src/components/NotificationSystem.svelte";
    import ConfettiSystem from "/src/components/ConfettiSystem.svelte";   
    import LoadingScreen from "/src/components/LoadingScreen.svelte";
    import Nav from "/src/components/Nav.svelte"
	import Footer from "/src/components/Footer.svelte";
	import FullNav from "/src/components/FullNav.svelte";

    let do_wait_for_theme_load = true;
    let mounted = !do_wait_for_theme_load;

    onMount(()=>{
        mounted = true;
    });

    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
    injectSpeedInsights();

    import { inject } from '@vercel/analytics'
    inject();
    
    /*
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

{#if mounted}
    <Nav />
    {#if $fullnav}
            <FullNav />
    {:else}
        <NotificationSystem />
        <ConfettiSystem />
    {/if}
    <slot />
    <Footer />
{:else}
    <LoadingScreen />
{/if}

<style>
    :global(body){
        background: var(--background-0);
    }
</style>

{#if $theme_store == "light"}
    <style>
        :root{
            --brand-color-strong: #3cb931;
            --brand-color: #46c925;
            --brand-color-weak: #57cd3f;
            --brand-color-weaker: #96e889;

            --success-color: #3cb931;
            --error-color: #d3534e;
            --info-color: #5678e9;

            --background-0: #ffffff;
            --background-1: #f4f5f3;
            --background-2: #eeefee;
            --nav-background: #e3e7dfc3;
            
            --strong-shadow: #0006 0px 0px 5px;
            --medium-shadow: #0005 0px 0px 10px;
            --weak-shadow: #0002 0px 0px 14px;
            --window-shadow: #4442 2px 5px 15px;
            --item-shadow: #0001 0 5px 10px;

            --text-color: #000;
            --text-color-weak: #353535;
            --title-color: #333;
            --first-title-color: #081808;
            --highlight-color: #000;

            --title-font: 'Roboto', sans-serif;
            --main-font: 'Roboto', sans-serif;
        
            --title-1: 2em;
            --title-2: 1.5em;
            --title-3: 1em;

            --nav-height: 70px;
            --side-margin: 120px;

            --text-0: 1.2em;
            --text-1: 1em;
            --text-2: 0.9em;
            
            --window-radius: 25px;
            --element-radius: 15px;

            --icon-filter: invert(0);
            --icon-filter-weak: invert(0.25);

            --clear-notification-color: #f5f5f5;
            --clear-notification-border: #fff;
            --fractal-opacity: 0.15;
        }
        *::selection{
            background-color:#3cb931ca;
            color: white;
            text-shadow: none;
        }
        @media screen and (max-width: 700px){
            :root{
                --side-margin: 20px;
                --nav-height: 60px;
            }
        }
    </style>
{:else if $theme_store == 'dark'}
    <style>
        :root{
            --brand-color: #70f14c;
            --brand-color-weak: #272b27;
            --brand-color-weaker: #488825;

            --success-color: #29af1c;
            --error-color: #ca4c48;
            --info-color: #5373db;
            
            --background-0: #1a1c1d;
            --background-1: #222526;
            --background-2: #26292a;
            --background-3: #282828;
            --nav-background: #070808f5;
            
            --strong-shadow: #8882 0px 0px 50px;
            --medium-shadow: #0002 0px 5px 10px;
            --weak-shadow: #0003 0px 0px 14px;
            --window-shadow: #4442 0px 5px 10px;
            --item-shadow: #05050510 0 5px 10px;

            --text-color: #fff;
            --text-color-weak: #aaa;
            --title-color: #ccc;
            --first-title-color: #56d935;
            --highlight-color: #f7f7f7;

            --title-font: 'Roboto', sans-serif;
            --main-font: 'Roboto', sans-serif;
        
            --title-1: 2em;
            --title-2: 1.5em;
            --title-3: 1em;

            --nav-height: 70px;
            --side-margin: 120px;

            --text-0: 1.2em;
            --text-1: 1em;
            --text-2: 0.9em;
            
            --window-radius: 25px;
            --element-radius: 15px;

            --icon-filter: invert(1);
            --icon-filter-weak: invert(0.5);

            --clear-notification-color: #1a1c1d;
            --clear-notification-border: #333;
            --fractal-opacity: 0.15;
        }
        *::selection{
            background-color:#3cb931ca;
            color: white;
            text-shadow: none;
        }
        @media screen and (max-width: 700px){
            :root{
                --side-margin: 20px;
                --nav-height: 60px;
            }
        }
        *{
            scrollbar-color: #3cb931 #1a1c1d;
        }
    </style>
{:else if $theme_store == "ocean"}
    <style>
        :root{
            --brand-color: #4381df;
            --brand-color-weak: #223146;
            --brand-color-weaker: #16537c;

            --success-color: #29af1c;
            --error-color: #ca4c48;
            --info-color: #4c58c0;
            
            --background-0: #171e2c;
            --background-1: #1d2736;
            --background-2: #1c2b3f;
            --background-3: #282c30;
            --nav-background: #0e1120f8;
            
            --strong-shadow: #8882 0px 0px 50px;
            --medium-shadow: #0002 0px 5px 10px;
            --weak-shadow: #0003 0px 0px 14px;
            --window-shadow: #364f7522 0 5px 10px;
            --item-shadow: #05070709 0 0 10px;

            --text-color: #caf7e4;
            --text-color-weak: #7a888b;
            --title-color: #ffffff;
            --first-title-color: #71abee;
            --highlight-color: #f7f7f7;

            --title-font: 'Rubik', sans-serif;
            --main-font: 'Nunito', sans-serif;
        
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
        *::selection{
            background-color:#27b1d4bb;
            color: white;
            text-shadow: none;
        }
        @media screen and (max-width: 700px){
            :root{
                --side-margin: 20px;
                --nav-height: 60px;
            }
        }
        *{
            scrollbar-color: #279dd4 #171c27;
        }
    </style>
{:else if $theme_store == 'fire'}
    <style>
        :root{
            --brand-color: #f19a36;
            --brand-color-weak: #3b2314;
            --brand-color-weaker: #b46637;

            --success-color: #2fbb22;
            --error-color: #d44d49;
            --info-color: #4661bb;
            
            --background-0: #1f1c1b;
            --background-1: #25201e;
            --background-2: #2b2323;
            --background-3: #2f2b2a;
            --nav-background: #0e0c0cf5;
            
            --strong-shadow: #8882 0px 0px 50px;
            --medium-shadow: #0002 0px 5px 10px;
            --weak-shadow: #0003 0px 0px 14px;
            --window-shadow: #4442 0px 5px 10px;
            --item-shadow: #05050510 0 5px 10px;

            --text-color: #f7e9c2;
            --text-color-weak: #050505;
            --title-color: #ffffff;
            --first-title-color: #f7b740;
            --highlight-color: #faf2f1;

            --title-font: 'Rakkas', serif;
            --main-font: 'Domine', serif;
        
            --title-1: 2em;
            --title-2: 1.5em;
            --title-3: 1em;

            --nav-height: 70px;
            --side-margin: 120px;

            --text-0: 1.1em;
            --text-1: 1em;
            --text-2: 0.9em;
            
            --window-radius: 20px;
            --element-radius: 10px;

            --icon-filter: invert(0.9);
            --icon-filter-weak: invert(0.05);
            --green-icons-filter: hue-rotate(266deg);

            --clear-notification-color: #1c1c1c;
            --clear-notification-border: #333;
            --fractal-opacity: 0.15;
        }
        *::selection{
            background-color:#f7c640bb;
            color: white;
            text-shadow: none;
        }
        @media screen and (max-width: 700px){
            :root{
                --side-margin: 20px;
                --nav-height: 60px;
            }
        }
        *{
            scrollbar-color: #f7a440 #1c1c1c;
        }
    </style>
{:else if $theme_store == "bubble"}
    <style>
        :root{
            --brand-color: #e94dcf;
            --brand-color-weak: #a528a9;
            --brand-color-weaker: #e43ece;

            --success-color: #29af1c;
            --error-color: #ca4c48;
            --info-color: #4c58c0;
            
            --background-0: #450f45;
            --background-1: #651a6f;
            --background-2: #8e38a1;
            --background-3: #74357b;
            --nav-background: #1a0e20f8;
            
            --strong-shadow: #8882 0px 0px 50px;
            --medium-shadow: #0002 0px 5px 10px;
            --weak-shadow: #0003 0px 0px 14px;
            --window-shadow: #a92bb237 0 5px 20px;
            --item-shadow: #29162a0c 0 0 10px;

            --text-color: #fff1f9;
            --text-color-weak: #bd82d8;
            --title-color: #ffffff;
            --first-title-color: #fc69fc;
            --highlight-color: #ffffff;

            --title-font: 'Pacifico', sans-serif;
            --main-font: 'Ubuntu', sans-serif;
        
            --title-1: 2em;
            --title-2: 1.5em;
            --title-3: 1em;

            --nav-height: 90px;
            --side-margin: 150px;

            --text-0: 1.2em;
            --text-1: 1em;
            --text-2: 0.9em;
            
            --window-radius: 40px;
            --element-radius: 30px;

            --icon-filter: invert(1);
            --icon-filter-weak: invert(0.6);
            --green-icons-filter: hue-rotate(211deg);

            --clear-notification-color: #6d1792;
            --clear-notification-border: #3d1147;
            --fractal-opacity: 0.15;
        }
        *::selection{
            background-color:#dc45a7bb;
            color: white;
            text-shadow: none;
        }
        @media screen and (max-width: 700px){
            :root{
                --side-margin: 20px;
                --nav-height: 70px;
            }
        }
        *{
            scrollbar-color: #e653cb #8e38a1;
        }
    </style>
{:else if $theme_store == "sun"}
<style>
    :root{
        --brand-color: #ffde20;
        --brand-color-weak: #f2dc31;
        --brand-color-weaker: #fdef96;

        --success-color: #c5bd25;
        --error-color: #d3534e;
        --info-color: #5678e9;

        --background-0: #ffffff;
        --background-1: #fcfbf3;
        --background-2: #fffeec;
        --nav-background: #efefeff6;
        
        --strong-shadow: #eee5a966 0px 0px 20px;
        --medium-shadow: #0005 0px 0px 10px;
        --weak-shadow: #0002 0px 0px 14px;
        --window-shadow: #f4cf2b43 0 0 15px;
        --item-shadow: #45423711 0 5px 10px;

        --text-color: #4a4641;
        --text-color-weak: #454545;
        --title-color: #615b54;
        --first-title-color: #2b180d;
        --highlight-color: #000;

        --title-font: 'Lobster', sans-serif;
        --main-font: 'Ubuntu', sans-serif;
    
        --title-1: 2.2em;
        --title-2: 1.6em;
        --title-3: 1em;

        --nav-height: 70px;
        --side-margin: 110px;

        --text-0: 1.2em;
        --text-1: 1.1em;
        --text-2: 0.9em;
        
        --window-radius: 20px;
        --element-radius: 12px;

        --icon-filter: invert(0);
        --icon-filter-weak: invert(0.35);
        --green-icons-filter: hue-rotate(300deg) brightness(1.4);

        --clear-notification-color: #fff9ec;
        --clear-notification-border: #fff;
        --fractal-opacity: 0.1;
    }
    *::selection{
        background-color:#ffc74dca;
        color: #160d0d;
        text-shadow: none;
    }
    @media screen and (max-width: 700px){
        :root{
            --side-margin: 20px;
            --nav-height: 60px;
        }
    }
    *{
        scrollbar-color: #fbee8b #fdfbc2;
    }
</style>
{/if}