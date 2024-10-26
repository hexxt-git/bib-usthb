<script>
    export let id = '';
    export let className = '';
    export let style = ''
</script>

<h1 id={id} class={className} {style}>
    <slot />
</h1>

<style>
    h1{
        margin: 0;
        padding: 25px 0px 0px 0px;
        text-decoration: var(--brand-color) underline;
        cursor: pointer;
        width: fit-content;
        font-family: var(--title-font);
        font-size: var(--title-1);
        color: var(--title-color);
        text-transform: capitalize;
    }
</style>