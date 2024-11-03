<script>
    import { page } from "$app/stores";
    import urlJoin from "url-join";
    $: filePath = urlJoin("/downloads/", $page.data.path || "/");

    import { onMount } from "svelte";

    let video;
    let analyser;
    let dataArray;
    let bars = [];
    let container;
    let numBars = 12; // Default value

    function updateBarsCount() {
        if (!container) return;
        const containerWidth = container.offsetWidth;
        numBars = Math.floor(containerWidth / 40);
        numBars = Math.max(12, numBars)

        if (analyser) {
            analyser.fftSize = Math.pow(2, Math.ceil(Math.log2(numBars * 2)));
            dataArray = new Uint8Array(numBars);
        }
    }

    onMount(() => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();

        // Initial setup of bars
        updateBarsCount();

        const source = audioContext.createMediaElementSource(video);
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        function updateVisualizer() {
            analyser.getByteFrequencyData(dataArray);
            // Take only the number of bars we want
            bars = Array.from(dataArray.slice(0, numBars)).map((value) => value / 3);
            requestAnimationFrame(updateVisualizer);
        }

        video.addEventListener("play", () => {
            audioContext.resume();
            updateVisualizer();
        });

        // Add resize listener
        const resizeObserver = new ResizeObserver((entries) => {
            updateBarsCount();
        });

        resizeObserver.observe(container);

        // Cleanup on component destroy
        return () => {
            resizeObserver.disconnect();
        };
    });
</script>

<div id="container" bind:this={container}>
    <div class="visualizer">
        {#each bars as height}
            <div class="bar" style="height: {height}%"></div>
        {/each}
    </div>
    <!-- svelte-ignore a11y-media-has-caption -->
    <video bind:this={video} controls height="30" preload="metadata">
        <source src={filePath} type="video/mp4" />
        Your browser does not support the video element.
    </video>
</div>

<style>
    #container {
        display: grid;
        grid-template-rows: 1fr auto;
        width: 100%;
        overflow-y: clip;
    }
    .visualizer {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        min-height: 100px;
    }

    .bar {
        border-radius: 3px 3px 0 0;
        width: 100%;
        background-color: var(--background-0);
        transition: height 0.1s ease;
        margin: 0 2px;
    }

    video {
        display: block;
        height: 45px;
        width: 100%;
        padding: 10px 0 25px 0;
        margin: 0 auto;
        box-sizing: content-box;
    }
</style>
