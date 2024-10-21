<script>
    import { writable } from "svelte/store";

    export let label = "";
    export let store = writable("");
    export let value = "";
    export let style = "";
    export let placeholder = "";


    const handle_input = (e) => {
        store.set(e.target.value);
    };

    store.subscribe((value) => (value = value));
    export let onInput = () => {};
</script>

<div {style}>
    <label for={label}>{label}{label ? ":" : ""}</label>
    <input
        type="text"
        name={label}
        id={label}
        bind:value={value}
        {placeholder}
        on:input={(event) => {
            handle_input(event);
            onInput(event);
        }}
    />
</div>

<style>
    div {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 10px;
    }
    label {
        padding: 5px 0 0 0;
        font-size: var(--text-0);
    }
    input {
        border: none;
        border-bottom: 2px solid var(--brand-color);
        font-family: var(--main-font);
        font-size: var(--text-1);
        padding: 5px 10px 2px 10px;
        border-radius: calc(var(--element-radius) / 2)
            calc(var(--element-radius) / 2) 0 0;
        background-color: var(--background-2);
        color: var(--highlight-color);
        min-width: 0;
        transition: background-color 200ms ease;
    }
    input:hover {
        background-color: #213249;
    }
    input:focus {
        outline: none;
    }
    input::placeholder {
        color: var(--brand-color);
        opacity: 0.8;
    }
</style>
