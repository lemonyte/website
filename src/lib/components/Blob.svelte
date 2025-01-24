<script lang="ts">
    import { onMount } from "svelte";

    interface Props {
        spread?: number;
        parallaxSensitivity?: number;
    }

    let { spread = 350, parallaxSensitivity = 0.05 }: Props = $props();

    let clientWidth = $state(0);
    let clientHeight = $state(0);
    let offsetX = 0;
    let offsetY = 0;
    const offsetZ = Math.random();
    const styles = $state({
        left: "",
        top: "",
        "background-color": "",
        "--breathe-speed": `${5 + Math.floor(Math.random() * 15)}s`,
        "--move-speed": "0s",
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

    onMount(() => {
        offsetX = Math.floor(clientWidth / 2 + spread * (Math.random() - 0.5) * 2);
        offsetY = Math.floor(clientHeight / 2 + spread * (Math.random() - 0.5) * 2);
        styles.left = `calc(50vw - ${offsetX}px)`;
        styles.top = `calc(50vh - ${offsetY}px)`;
        styles["background-color"] =
            `rgb(${Math.floor(Math.random() * 127)}, ${Math.floor(Math.random() * 255)}, 255)`;
        setTimeout(() => (styles["--move-speed"] = `2s`), 1000);
    });
</script>

<svelte:window onmousemove={parallax} />

<div
    bind:clientWidth
    bind:clientHeight
    class="bg-blob blur-3xl bg-white dark:bg-black"
    role="none"
    style:left={styles.left}
    style:top={styles.top}
    style:background-color={styles["background-color"]}
    style:--breathe-speed={styles["--breathe-speed"]}
    style:--move-speed={styles["--move-speed"]}
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

    .bg-blob {
        width: 20vh;
        height: 20vh;
        position: fixed;
        left: 40vw;
        top: 40vh;
        z-index: -20;
        transition:
            background-color var(--breathe-speed),
            left var(--move-speed) cubic-bezier(0.1, 0, 0.5, 1),
            top var(--move-speed) cubic-bezier(0.1, 0, 0.5, 1);
        animation: var(--breathe-speed) ease-in-out infinite alternate breathe;
    }
</style>
