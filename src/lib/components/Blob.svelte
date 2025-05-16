<script lang="ts">
    import { onMount } from "svelte";

    interface Props {
        spread?: number;
        parallaxSensitivity?: number;
    }

    const { spread = 350 }: Props = $props();

    const styles = $state({
        left: "50vw",
        top: "50vh",
        backgroundColor: "",
        animationName: "",
        breatheSpeed: 0,
    });

    onMount(() => {
        styles.left = `calc(50vw - ${Math.floor(spread * (Math.random() - 0.5) * 2)}px)`;
        styles.top = `calc(50vh - ${Math.floor(spread * (Math.random() - 0.5) * 2)}px)`;
        styles.backgroundColor = `rgb(${Math.floor(Math.random() * 180)}, ${Math.floor(Math.random() * 255)}, 255)`;
        styles.animationName = "fade-in, breathe";
        styles.breatheSpeed = 5 + Math.floor(Math.random() * 15);
    });
</script>

<div
    class="bg-blob blur-3xl"
    role="none"
    style:left={styles.left}
    style:top={styles.top}
    style:background-color={styles.backgroundColor}
    style:animation-name={styles.animationName}
    style:--breathe-speed={`${styles.breatheSpeed}s`}
></div>

<style lang="postcss">
    .bg-blob {
        opacity: 0;
        width: 20vh;
        height: 20vh;
        position: fixed;
        left: 50vw;
        top: 50vh;
        z-index: -20;
        transform: translate(-50%, -50%);
        will-change: opacity;
        animation-timing-function: ease-in-out;
        animation-duration: var(--breathe-speed);
        /* Start breathe animation 1 second before fade-in ends to prevent flashing */
        animation-delay: 0s, calc(var(--breathe-speed) - 1s);
        animation-iteration-count: 1, infinite;
        animation-direction: normal, alternate;
    }
</style>
