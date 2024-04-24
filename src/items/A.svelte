<script>
    export let href = '/';
    export let id = '';
    export let className = '';
</script>

<a href={href} id={id} class={className}>
    <slot />
</a>

<style>
    p{
        margin: 10px 0;
        font-size: 1.1em;
        line-height: 1.2em;
        word-spacing: 2px;
    }
    a{
        color: var(--brand-color);
        text-decoration: underline;
    }
</style>