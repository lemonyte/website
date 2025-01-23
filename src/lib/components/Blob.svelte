<script lang="ts">
    import { onMount } from "svelte";

    interface Props {
        spread?: number;
        parallaxSensitivity?: number;
    }

    let { spread = 250, parallaxSensitivity = 0.05 }: Props = $props();

    let clientWidth: number = $state(0);
    let clientHeight: number = $state(0);
    let offsetX: number;
    let offsetY: number;
    const offsetZ = Math.random();
    const styles = $state({
        left: "",
        top: "",
        "--breathe-speed": `${5 + Math.floor(Math.random() * 15)}s`,
        "background-color": "black",
    });

    onMount(() => {
        offsetX = Math.floor(clientWidth / 2 + spread * (Math.random() - 0.5) * 2);
        offsetY = Math.floor(clientHeight / 2 + spread * (Math.random() - 0.5) * 2);
        styles.left = `calc(50vw - ${offsetX}px)`;
        styles.top = `calc(50vh - ${offsetY}px)`;
        styles["background-color"] =
            `rgb(${Math.floor(Math.random() * 127)}, ${Math.floor(Math.random() * 255)}, 255)`;
    });

    const parallax = (event: MouseEvent) => {
        const center = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        };
        const mouseOffset = {
            x: (event.clientX - center.x) * parallaxSensitivity * offsetZ,
            y: (event.clientY - center.y) * parallaxSensitivity * offsetZ,
        };
        styles.left = `calc(50vw - ${offsetX + mouseOffset.x}px)`;
        styles.top = `calc(50vh - ${offsetY + mouseOffset.y}px)`;
    };
</script>

<svelte:window onmousemove={parallax} />

<div
    bind:clientWidth
    bind:clientHeight
    class="bg-blob"
    style:left={styles.left}
    style:top={styles.top}
    style:--breathe-speed={styles["--breathe-speed"]}
    style:background-color={styles["background-color"]}
    role="none"
></div>

<style lang="postcss">
    @reference "tailwindcss/theme";

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
        /* Bug: this forces the blob's position to the center of the page. */
        /* offset-path: circle(5%); */
        position: fixed;
        width: 20vh;
        height: 20vh;
        animation:
            var(--breathe-speed) ease-in-out infinite alternate breathe,
            60s linear infinite rotate;
        transition: background-color 10s;
        left: 40vw;
        top: 40vh;
        background-color: black;
    }
</style>
