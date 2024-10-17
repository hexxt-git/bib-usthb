<script>
    import { Confetti } from "svelte-confetti"
    import { confetti_array } from "$lib/components/confetti_store"
</script>

{#each $confetti_array as confetti (confetti.id)}
    <div style="
        position: fixed;
        top: -50px;
        left: 0;
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        overflow: hidden;
        pointer-events: none;
        z-index: 10;
        "
    ><Confetti x={[-5, 5]} y={[-1, 2]} amount=300 fallDistance="400px" /></div>
{/each}