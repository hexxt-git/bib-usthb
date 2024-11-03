<script>
    export let id = '';
    export let className = '';
</script>

<main id={id} class={className}>
    <slot />
</main>

<style>
    main {
        padding: 0 var(--side-margin) 30px var(--side-margin);
        min-height: calc(100vh - 290px);
        font-family: var(--main-font);
        background-color: var(--background-0);
        color: var(--text-color);
    }
</style>