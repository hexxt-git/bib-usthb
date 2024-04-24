<script>
    export let href = '/';
    export let id = '';
    export let className = '';
    export let target = '';
</script>

<a href={href} id={id} class={className} target={target}>
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