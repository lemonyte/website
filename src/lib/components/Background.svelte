<script lang="ts">
    import { Canvas, Layer } from "svelte-canvas";
    import type { Render } from "svelte-canvas";
    import { MediaQuery } from "svelte/reactivity";

    const { numBlobs = 24, spread = 0.8, fps = 15 } = $props();

    const reducedMotion = new MediaQuery("(prefers-reduced-motion: reduce)");

    let canvas: Canvas | undefined = $state();

    $effect(() => {
        if (reducedMotion.current) {
            return;
        }
        const interval = 1000 / fps;
        let last = 0;
        let frame = requestAnimationFrame(function loop(now) {
            if (now - last >= interval) {
                last = now;
                canvas?.redraw();
            }
            frame = requestAnimationFrame(loop);
        });
        return () => cancelAnimationFrame(frame);
    });

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

    const render: Render = ({ context, width, height, time }) => {
        time /= 1000;
        const xMargin = width < 768 ? 0 : width * 0.2;
        blobs.forEach((blob) => {
            // With reduced motion, draw a single static frame without the breathing or fade-in.
            const breathe = reducedMotion.current ? 0 : time * ((2 * Math.PI) / blob.breatheSpeed);
            let opacity = 0.3 + Math.sin(breathe + blob.breathePhase) * 0.1;
            if (!reducedMotion.current && time < blob.breatheSpeed + blob.breathePhase) {
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
</script>

<Canvas bind:this={canvas} pixelRatio={0.05} class="w-full h-full fixed top-0 left-0 -z-20 blur-2xl">
    <Layer {render} />
</Canvas>
