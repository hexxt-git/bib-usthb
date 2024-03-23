<script>
    import { onMount, onDestroy } from 'svelte';

    export let state = "error"
    export let message = "an error must have occured"
    export let id = 0
    export let duration = 30*1000

    import {delete_notification} from './notification_store'
    let time = 0;
    let interval;

    onMount(() => {
        interval = setInterval(() => {
            time += 50;
            if (time >= duration) {
                delete_notification(id);
                clearInterval(interval);
            }
        }, 50);
    });

    onDestroy(() => {
        if (interval) {
            clearInterval(interval);
        }
    });
</script>

<main class={state}>
    <h3>{state}</h3>
    <p>{message}</p>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span on:click={()=>delete_notification(id)}>x</span>
    <div class="timer" style="width: {100 - time/duration*100}%;"></div>
</main>

<style>
    main{
        width: 350px;
        max-width: 90vw;
        padding: 15px;
        color: white;
        border-radius: var(--element-radius);
        box-shadow: var(--medium-shadow);
        position: relative;
        opacity: 0.9;
        animation: appear 200ms ease-out;
        overflow: hidden;
    }
    @keyframes appear{
        from{
            opacity: 0;
        } to {
            opacity: 0.9;
        }
    }
    .success{
        background-color: var(--success-color);
        outline: solid #35cc2b 2px;
    }
    .error{
        background-color: var(--error-color);
        outline: solid #d47447 2px;
    }
    .notification{
        background-color: var(--info-color);
        outline: solid #278ed3 2px;
    }
    main h3{
        margin: 0;
        margin-bottom: 5px;
        color: #0005;
    }
    main p{
        margin: 0;
    }
    main span{
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: monospace;
        position: absolute;
        top: 0;
        right: 0;
        width: 20px;
        height: 20px;
        margin: 10px;
        padding-bottom: 2px;
        background-color: #ffffff30;
        border: solid #ffffff32 1px;
        color: #fffb;
        border-radius: 100%;
        user-select: none;
        cursor: pointer;
    }
    .timer{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #fff8;
    }
</style>
