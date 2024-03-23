<script>
    import Notification from './Notification.svelte'
    import {notification_store} from './notification_store.js'

</script>

<main>
    {#if ($notification_store).length > 0}
    {#each $notification_store as notification}
        <Notification state={notification.state} message={notification.message} id={notification.id} duration={notification.duration} />
    {/each}
    {/if}
</main>

<style>
    main{
        position: fixed;
        top: var(--nav-height);
        right: 0;
        display: flex;
        flex-direction: column-reverse;
        z-index: 2;
        gap: 15px;
        padding: 15px;
    }
</style>