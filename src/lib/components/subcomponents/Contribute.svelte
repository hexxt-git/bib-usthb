<script>
    import { onMount, onDestroy } from "svelte";

    const config = {
        sparkles: {
            min: 5,
            max: 12,
            spawnChance: 0.85,
            spawnInterval: 60,
            initialSpread: {
                x: 40,
                y: 30,
            },
            size: {
                min: 0.7,
                max: 1.2,
            },
            velocity: {
                x: {
                    min: -0.6,
                    max: 0.6,
                },
                y: {
                    min: -0.7,
                    max: 0,
                },
                rotation: {
                    min: -2,
                    max: 2,
                },
            },
            gravity: 0.005,
            lifespan: 3000,
            updateInterval: 16,
        },
    };

    const state = {
        hover: false,
        sparkles: [],
        mouse: {
            x: 0,
            y: 0,
        },
        frame: 0,
        button: null,
        intervalId: null,
    };

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function randomSpread(center, spread) {
        return center + random(-spread / 2, spread / 2);
    }

    function createSparkle(x, y) {
        const { sparkles: s } = config;
        return {
            x: randomSpread(x, s.initialSpread.x),
            y: randomSpread(y, s.initialSpread.y),
            r: random(0, 360),
            s: random(s.size.min, s.size.max),
            vx: random(s.velocity.x.min, s.velocity.x.max),
            vy: random(s.velocity.y.min, s.velocity.y.max),
            vr: random(s.velocity.rotation.min, s.velocity.rotation.max),
            life: s.lifespan,
        };
    }

    function updateSparkles() {
        const { sparkles: s } = config;
        state.frame++;

        state.sparkles = state.sparkles
            .map((sparkle) => {
                sparkle.x += sparkle.vx;
                sparkle.y += sparkle.vy;
                sparkle.r += sparkle.vr;
                sparkle.vy += s.gravity;
                sparkle.life -= s.updateInterval;
                return sparkle;
            })
            .filter((sparkle) => sparkle.life > 0);

        if (state.hover && Math.random() > s.spawnChance && state.sparkles.length < s.max) {
            state.sparkles.push(createSparkle(state.mouse.x, state.mouse.y));
        }

        if (state.sparkles.length < s.min && state.frame % s.spawnInterval === 0) {
            const rect = state.button.getBoundingClientRect();
            const x = random(0, rect.width);
            const y = 0;
            state.sparkles.push(createSparkle(x, y));
        }
    }

    function handleMouseMove(event) {
        const rect = state.button.getBoundingClientRect();
        state.mouse.x = event.clientX - rect.left;
        state.mouse.y = event.clientY - rect.top;
    }

    onMount(() => {
        state.intervalId = setInterval(updateSparkles, config.sparkles.updateInterval);
    });

    onDestroy(() => {
        clearInterval(state.intervalId);
    });
</script>

<a
    href="/contribute"
    bind:this={state.button}
    on:mouseenter={() => (state.hover = true)}
    on:mouseleave={() => (state.hover = false)}
    on:mousemove={handleMouseMove}
>
    contribute
    {#each state.sparkles as sparkle}
        <img
            src="/images/sparkle.svg"
            style="
                    top: {sparkle.y}px;
                    left: {sparkle.x}px;
                    transform: rotate({sparkle.r}deg) scale({sparkle.s});
                "
            alt="sparkle"
            role="presentation"
            aria-hidden="true"
        />
    {/each}
</a>

<style>
    a {
        color: black;
        background-color: var(--brand-color);
        height: 35px;
        padding: 0 13px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: var(--element-radius);
        user-select: none;
        cursor: pointer;
        text-decoration: none;
        font-weight: 500;
        font-size: var(--text-0);
        letter-spacing: 1px;
        box-shadow: #3687f018 0 10px 5px -5px;
        position: relative;
        transition: 600ms ease;
    }
    a:hover {
        box-shadow: #3687f042 0 0 20px 0;
    }
    a::before{
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        border-radius: var(--element-radius);
        transition: 200ms ease;
    }
    a:active::before {
        backdrop-filter: brightness(1.1) saturate(1.05);
    }
    a:hover img {
        opacity: 0.2;
    }
    img {
        position: absolute;
        width: 15px;
        height: 15px;
        /* background: white; */
        opacity: 0.15;
        /* box-shadow: white 0 0 10px; */
        filter: drop-shadow(white 0 0 10px);
        user-select: none;
        pointer-events: none;
    }
</style>
