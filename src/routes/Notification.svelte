<script>
    export let state = "error"
    export let message = "an error had occured"
    export let id = 0
    export let duration = 60*1000

    import {delete_notification} from './notification_store'
    setTimeout(()=>delete_notification(id), duration)
</script>

<main class={state}>
    <h3>{state}</h3>
    <p>{message}</p>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span on:click={()=>delete_notification(id)}>x</span>
</main>

<style>
    main{
        width: 350px;
        padding: 15px;
        color: white;
        border-radius: var(--element-radius);
        box-shadow: var(--medium-shadow);
        position: relative;
        opacity: 0.9;
        animation: appear 200ms ease-out;
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
</style>
