<script>
    export let label = ''
    export let options = []
    export let style = ''
</script>

<div style={style}>
    <label for={label}>topic:</label>
    <select name={label} id={label} value="" required>
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
    }
    select{
        max-width: 100%;
        box-sizing: border-box;
        outline: none;
        border: solid 1px #444;
        border-radius: 8px;
    }
</style>