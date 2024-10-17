<script>
	import { writable } from "svelte/store";

    export let label = '';
    export let store = writable(0)
    export let style = ''

    let local_value = ''

    const handle_input = e => {
        store.set(e.target.value)
    }

    store.subscribe(value => local_value = value)
</script>

<div style={style}>
    <label for={label}>{label}: </label>
    <input type='text' name={label} id={label} bind:value={local_value} on:input={handle_input}>
</div>

<style>
    div{
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 10px;
    }
    label{
        padding: 5px 0 0 0;
    }
    input{
        border: none;
        border-bottom: 2px solid var(--brand-color);
        font-family: var(--main-font);
        font-size: var(--text-1);
        padding: 5px 5px 0 10px;
        border-radius: calc(var(--element-radius)/2) calc(var(--element-radius)/2) 0 0;
        background-color: var(--background-2);
        color: var(--highlight-color);
    }
    input:focus{
        outline: none;
    }
</style>