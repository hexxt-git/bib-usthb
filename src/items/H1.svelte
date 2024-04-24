<script>
    export let id = '';
    export let className = '';
</script>

<h1 id={id} class={className}>
    <slot />
</h1>

<style>
    h1{
        margin: 0;
        padding: 20px 0px 0px 0px;
        text-decoration: var(--brand-color) underline;
        user-select: none;
        cursor: pointer;
        width: fit-content;
        font-family: var(--title-font);
        font-size: var(--title-1);
        color: var(--title-color);
    }
</style>