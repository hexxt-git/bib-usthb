<script>
    export let id = '';
    export let className = '';
</script>

<h3 id={id} class={className}>
    <slot />
</h3>

<style>
    h3{
        margin: 15px 0px 0px 0px;
        text-decoration: var(--brand-color) underline;
        cursor: pointer;
        width: fit-content;
        font-family: var(--title-font);
        font-size: var(--title-3);
        color: var(--title-color);
        text-transform: capitalize;
    }
</style>