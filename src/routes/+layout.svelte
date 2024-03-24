<script>
    import { theme_store } from "./theme_store.js"

    import NotificationSystem from "./NotificationSystem.svelte";    
</script>

<NotificationSystem />
<slot />

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
            --text-color-weak: #555;
            --title-color: #333;
            --first-title-color: #081808;

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
            --weak-shadow: #fff3 0px 0px 14px;
            --window-shadow: #4442 0px 5px 10px;
            --item-shadow: #05050510 0 5px 10px;

            --text-color: #fff;
            --text-color-weak: #aaa;
            --title-color: #ccc;
            --first-title-color: #56d935;

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
{/if}
