<script>
    import { theme_store } from "./theme_store.js"

    import NotificationSystem from "./NotificationSystem.svelte";    
</script>

<NotificationSystem />
<slot />

{#if true}
    <style>
        body{
            background: var(--background-0);
        }
    </style>
{/if}

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

            --main-font: 'Roboto', sans-serif;
            --title-font: 'Rubik', sans-serif;
        
            --title-1: 2em;
            --title-2: 1.5em;
            --title-3: 1.2em;

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

            --main-font: 'Roboto', sans-serif;
            --title-font: 'Rubik', sans-serif;
        
            --title-1: 2em;
            --title-2: 1.5em;
            --title-3: 1.2em;

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

            --main-font: 'Roboto', sans-serif;
            --title-font: 'Rubik', sans-serif;
        
            --title-1: 2em;
            --title-2: 1.5em;
            --title-3: 1.2em;

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

            /* --main-font: 'Domine', serif; */
            --title-font: 'Rakkas', serif;
        
            --title-1: 2em;
            --title-2: 1.5em;
            --title-3: 1.2em;

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
{/if}