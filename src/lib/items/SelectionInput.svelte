<script>
	import { writable } from "svelte/store";

    export let label = ''
    export let options = []
    export let style = ''
    export let store = writable('');

    let handle_input = e => {
        store.set(e.target.value)
    }
</script>

<div style={style}>
    {#if label}
        <label for={label}>{label}:</label>
    {/if}
    <select name={label} id={label} value={$store} on:input={handle_input} required>
    {#each options as option}
        <option value={option}>{option}</option>
    {/each}
    </select>
</div>

<style>
    div{
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 10px;
        overflow: hidden;
        margin-bottom: 3px;
    }
    select{
        max-width: 100%;
        box-sizing: border-box;
        outline: none;
        border: solid 1px #444;
        border-radius: 8px;
    }
</style>