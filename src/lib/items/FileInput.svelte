<script>
    import { writable } from "svelte/store";

    export let store = writable(0);
    export let style = "";
    export let id = Math.floor(Math.random() * 10000);

    let local_file;

    const handle_input = (e) => {
        store.set(e.target.files);
    };

    store.subscribe((value) => (local_file = value));
</script>

<div {style}>
    <label for="file-{id}">
        File:
        {#if !local_file[0]}<span>upload</span>
        {:else}
            <span>change</span>
            <div>{local_file[0].name}</div>
        {/if}
    </label>
    <input type="file" id="file-{id}" name="file-{id}" on:input={handle_input} bind:files={local_file} />
</div>

<style>
    div {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 10px;
        margin: 5px 0;
        font-size: var(--text-1);
    }
    label {
        font-size: var(--text-0);
    }
    div input {
        display: none;
    }
    div label span {
        padding: 0 5px;
        margin-left: 5px;
        border: solid 1px #666;
        border-radius: 8px;
        cursor: pointer;
        user-select: none;
        color: var(--highlight-color);
    }
    div label:hover span {
        text-decoration: underline;
    }
    div label div {
        display: inline;
        color: var(--highlight-color);
    }
</style>
