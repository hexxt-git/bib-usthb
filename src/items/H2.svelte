<script>
    export let id = '';
    export let className = '';
</script>

<h2 id={id} class={className}>
    <slot />
</h2>

<style>
    h2{
        margin: 10px 0px 0px 0px;
        text-decoration: var(--brand-color) underline;
        user-select: none;
        cursor: pointer;
        width: fit-content;
        font-family: var(--title-font);
        font-size: var(--title-2);
        color: var(--title-color);
    }
</style>