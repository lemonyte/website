<script lang="ts">
    import { MediaQuery } from "svelte/reactivity";

    import { motion } from "#lib/motion.svelte.ts";

    const { numBlobs = 24, spread = 0.8, fps = 15 } = $props();

    const dark = new MediaQuery("(prefers-color-scheme: dark)");
    // Longest possible fade-in (max breatheSpeed + max breathePhase), in seconds.
    const FADE_IN_END = 20 + Math.PI * 2;
    // The canvas is blurred anyway, so a tiny resolution looks the same and is much cheaper to draw.
    const PIXEL_RATIO = 0.05;

    let canvas: HTMLCanvasElement | undefined = $state();
    let width = $state(0);
    let height = $state(0);

    let clock: number | undefined;
    let lastTime: number | undefined;

    const blobs = $derived(
        Array.from({ length: numBlobs }, () => ({
            x: (Math.random() - 0.5) * 2 * spread,
            y: (Math.random() - 0.5) * 2 * spread,
            radius: 0.1 + Math.random() * 0.15,
            r: Math.floor(Math.random() * 127),
            g: Math.floor(Math.random() * 255),
            b: 255,
            breatheSpeed: 5 + Math.random() * 15,
            breathePhase: Math.random() * Math.PI * 2,
        })),
    );

    const draw = () => {
        const context = canvas?.getContext("2d");
        if (!context) {
            return;
        }
        const now = performance.now() / 1000;
        // If motion starts out disabled, skip the fade-in so the static frame is fully visible.
        clock ??= motion.enabled ? 0 : FADE_IN_END;
        if (motion.enabled) {
            // Cap the step so the animation doesn't jump after being paused or in a hidden tab.
            clock += Math.min(now - (lastTime ?? now), 0.25);
        }
        lastTime = now;
        const time = clock;
        const xMargin = width < 768 ? 0 : width * 0.2;
        const opacityScale = dark.current ? 1 : 0.6;
        context.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);
        context.clearRect(0, 0, width, height);
        blobs.forEach((blob) => {
            let opacity =
                (0.3 + Math.sin(time * ((2 * Math.PI) / blob.breatheSpeed) + blob.breathePhase) * 0.1) * opacityScale;
            if (time < blob.breatheSpeed + blob.breathePhase) {
                opacity *= (time - blob.breathePhase) / blob.breatheSpeed;
            }
            const x = blob.x * ((width - 2 * xMargin) / 2) + width / 2;
            const y = blob.y * (height / 2) + height / 2;
            const radius = blob.radius * (height / 2);

            context.fillStyle = `rgba(${blob.r}, ${blob.g}, ${blob.b}, ${opacity})`;
            context.beginPath();
            context.arc(x, y, radius, 0, Math.PI * 2);
            context.fill();
        });
    };

    // Redraw whenever the size or color scheme changes, which also covers the first frame.
    $effect(draw);

    $effect(() => {
        if (!motion.enabled) {
            return;
        }
        const interval = 1000 / fps;
        let last = 0;
        let frame = requestAnimationFrame(function loop(now) {
            if (now - last >= interval) {
                last = now;
                draw();
            }
            frame = requestAnimationFrame(loop);
        });
        return () => cancelAnimationFrame(frame);
    });
</script>

<canvas
    bind:this={canvas}
    bind:clientWidth={width}
    bind:clientHeight={height}
    width={width * PIXEL_RATIO}
    height={height * PIXEL_RATIO}
    class="w-full h-full fixed top-0 left-0 -z-20 blur-2xl"
></canvas>
