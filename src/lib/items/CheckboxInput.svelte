<script>
	import { writable } from "svelte/store";

    export let label = '';
    export let store = writable(0);
    
    let local_value = false

    let handle_input = e => {
        store.set(e.target.checked)
    }

    store.subscribe(value => local_value = value)

</script>

<div>
    <label for={label}>{label}: </label>
    <input type="checkbox" id={label} name={label} on:input={handle_input} bind:checked={local_value}>
</div>

<style>
    div{
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: var(--text-0);
    }
    input[type="checkbox"] {
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
    label {
        cursor: pointer;
    }
</style>