<script>
    import Notification from './subcomponents/Notification.svelte'
    import {notification_store} from './notification_store.js'
    import {clear_notifications} from './notification_store.js'

</script>

<main>
    {#if ($notification_store).length > 0}
    {#each $notification_store as notification (notification.id)}
        <Notification state={notification.state} message={notification.message} id={notification.id} duration={notification.duration} />
    {/each}
    <button on:click={clear_notifications}>clear</button>
    {/if}
</main>

<style>
    main{
        position: fixed;
        top: var(--nav-height);
        right: 0;
        display: flex;
        flex-direction: column-reverse;
        z-index: 3;
        gap: 15px;
        padding: 15px;
    }
    button{
        background-color: var(--clear-notification-color);
        color: var(--text-color);
        border: solid var(--clear-notification-border) 1px;
        border-radius: calc(var(--element-radius) * 0.5);
        padding: 5px 10px;
        cursor: pointer;
        font-size: var(--text-2);
        letter-spacing: 2px;
        box-shadow: var(--weak-shadow);
        opacity: 0.9;
        animation: appear 300ms ease-out;
    }
    button:hover{
        text-decoration: underline;
    }
    @keyframes appear{
        from{
            opacity: 0;
        } to {
            opacity: 0.9;
        }
    }
</style>