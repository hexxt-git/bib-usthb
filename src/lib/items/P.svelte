<script>
    export let id = '';
    export let className = '';
</script>

<p id={id} class={className}>
    <slot />
</p>

<style>
    p{
        margin: 10px 0;
        font-size: 1.1em;
        line-height: 1.2em;
        word-spacing: 2px;
    }
</style>