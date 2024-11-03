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
    a{
        color: var(--brand-color);
        text-decoration: underline;
    }
</style>