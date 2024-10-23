<script>
	import { writable } from "svelte/store";

    export let store = writable(0)
    export let placeholder = ''
    export let rows = 2
    export let required = false
    export let label = ''
    export let style = ''

    let local_value = ''
    let handle_input = e => {
        store.set(e.target.value);
    }
</script>

<div style={style}>
    <label for={label}>{label}{label?':':''} </label>
    <textarea name={label} id={label} placeholder={placeholder} rows={rows} required={required} bind:value={local_value} on:input={handle_input}></textarea>
</div>

<style>
    div{
        display: grid;
    }
    textarea{
        margin-top: 5px;
        width: 100%;
        max-width: calc(100vw - var(--side-margin)*2);
        background-color: var(--background-2);
        border-radius: var(--element-radius);
        color: var(--highlight-color);
        font-family: var(--main-font);
        font-size: var(--text-0);
        padding: 10px;
        border: none;
        border-bottom: 3px solid var(--brand-color);
    }
    textarea::placeholder{
        color: var(--text-color-weak);
    }
    textarea:focus{
        outline: none;
    }
</style>