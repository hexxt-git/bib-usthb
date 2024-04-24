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
        max-width: calc(100vw - var(--side-margin)*2 - 40px);
        background-color: var(--background-2);
        border-radius: var(--element-radius);
        color: var(--highlight-color);
        font-family: var(--main-font);
        font-size: var(--text-1);
        padding: 10px;
        border-color: var(--text-color-weak);
    }
    textarea::placeholder{
        color: var(--text-color-weak);
    }
    textarea:focus{
        outline: none;
    }
</style>