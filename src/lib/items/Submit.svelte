<script>
    export let disabled = false
</script>

{#if disabled}
    <button type="submit" disabled> <slot /> </button>
{:else}
    <button type="submit"> <slot /> </button>
{/if}
<style>
    button{
        padding: 10px 16px;
        border: none;
        border-radius: var(--element-radius);
        box-shadow: var(--weak-shadow);
        cursor: pointer;
        user-select: none;
        font-size: var(--text-1);
        color: var(--background-0);
        font-weight: 600;
        margin-left: auto;
        display: block;
        background-color: var(--brand-color);
        grid-column: 1 / -1;
    }
    button:disabled{
        filter: saturate(0.7);
        cursor: wait;
    }
</style>