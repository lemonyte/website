<script lang="ts">
    import { Canvas, Layer } from "svelte-canvas";
    import type { Render } from "svelte-canvas";

    const { numBlobs = 24, spread = 0.8 } = $props();

    const blobs = Array.from({ length: numBlobs }, () => ({
        x: (Math.random() - 0.5) * 2 * spread,
        y: (Math.random() - 0.5) * 2 * spread,
        radius: 0.1 + Math.random() * 0.15,
        r: Math.floor(Math.random() * 127),
        g: Math.floor(Math.random() * 255),
        b: 255,
        breatheSpeed: 5 + Math.random() * 15,
        breathePhase: Math.random() * Math.PI * 2,
    }));

    const render: Render = ({ context, width, height, time }) => {
        time /= 1000;
        const xMargin = width < 768 ? 0 : width * 0.2;
        blobs.forEach((blob) => {
            let opacity = 0.3 + Math.sin(time * ((2 * Math.PI) / blob.breatheSpeed) + blob.breathePhase) * 0.1;
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
</script>

<Canvas autoplay class="w-full h-full fixed top-0 left-0 -z-20 blur-2xl">
    <Layer {render} />
</Canvas>
