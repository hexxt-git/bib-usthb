<script>
	import { onMount } from "svelte";

    let theme = "light";
    onMount(() => {
        theme = localStorage.getItem("theme") || "light";
    })

</script>

<slot />

{#if theme == "light"}
    <style>
        :root{
            --brand-color-strong: #3cb931;
            --brand-color: #46c925;
            --brand-color-weak: #57cd3f;
            --brand-color-weaker: #96e889;
            
            --background-0: #ffffff;
            --background-1: #f4f5f3;
            --background-2: #eeefee;
            
            --strong-shadow: #0006 0px 0px 5px;
            --medium-shadow: #0005 0px 0px 10px;
            --weak-shadow: #0002 0px 0px 14px;
            --window-shadow: #4442 2px 5px 15px;

            --text-color: #000;
            --text-color-weak: #555;
            --title-color: #333;

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
            }
        }
    </style>
{/if}