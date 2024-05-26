<script lang="ts">
    import { onMount } from "svelte";

    export let spread = 250;
    export let parallaxSensitivity = 0.05;

    let blob: Element;
    let color: string;
    let offsetX: number;
    let offsetY: number;
    let offsetZ: number;
    let duration: number;
    let currentOffsetX: number;
    let currentOffsetY: number;

    onMount(() => {
        color = `rgb(${Math.floor(Math.random() * 127)}, ${Math.floor(Math.random() * 255)}, 255)`;
        offsetX = Math.floor(blob.clientWidth / 2 + spread * (Math.random() - 0.5) * 2);
        offsetY = Math.floor(blob.clientHeight / 2 + spread * (Math.random() - 0.5) * 2);
        offsetZ = Math.random();
        duration = 5 + Math.floor(Math.random() * 15);
    });

    const parallax = (event: MouseEvent) => {
        const center = [window.innerWidth / 2, window.innerHeight / 2];
        const mouseOffset = [
            (event.clientX - center[0]) * parallax_sensitivity * offsetZ,
            (event.clientY - center[1]) * parallax_sensitivity * offsetZ,
        ];
        currentOffsetX += mouseOffset[0];
        currentOffsetY += mouseOffset[1];
    };
</script>

<div
    bind:this={blob}
    on:mousemove={parallax}
    class="bg-blob"
    style="left: calc(50vw - {offsetX}px); top: calc(50vh - {offsetY}px); --breathe-speed: {duration}s; background-color: {color};"
    role="none"
></div>

<style lang="postcss">
    @keyframes breathe {
        0% {
            opacity: 0.2;
        }
        100% {
            opacity: 0.4;
        }
    }

    @keyframes rotate {
        0% {
            offset-distance: 0%;
        }
        100% {
            offset-distance: 100%;
        }
    }

    .bg-blob {
        @apply blur-3xl;
        /* This forces the blob's position to the center of the page. */
        /* offset-path: circle(5%); */
        position: fixed;
        width: 20vh;
        height: 20vh;
        animation:
            var(--breathe-speed) ease-in-out infinite alternate breathe,
            60s linear infinite rotate;
        transition: background-color 10s;
        z-index: -30;
        left: 40vw;
        top: 40vh;
        background-color: black;
    }
</style>
