import { motion } from "#lib/motion.svelte.ts";

declare global {
    interface Window {
        rybbit?: {
            event: (name: string, properties?: Record<string, string | number | boolean>) => void;
        };
    }
}

/**
 * Samples frame timings for a few seconds after page load and reports a summary to Rybbit as a `frame-stats` event.
 * Only main-thread frame timing is visible here, so GPU-side jank is under-reported.
 */
export const reportFrameStats = ({ warmup_ms = 2000, sample_ms = 5000 } = {}) => {
    const deltas: number[] = [];
    let frame = 0;
    let last = 0;
    let start = 0;
    let scrolled = false;

    const onScroll = () => (scrolled = true);

    const stop = () => {
        cancelAnimationFrame(frame);
        clearTimeout(warmup);
        window.removeEventListener("scroll", onScroll);
        document.removeEventListener("visibilitychange", stop);
    };

    const report = () => {
        if (!window.rybbit || deltas.length < 10) {
            return;
        }
        const sorted = deltas.sort((a, b) => a - b);
        const median = sorted[Math.floor(sorted.length / 2)];
        const average = deltas.reduce((sum, delta) => sum + delta, 0) / deltas.length;
        // A frame is slow if it took noticeably longer than the display's refresh interval.
        const slowFrames = deltas.filter((delta) => delta > median * 1.5).length;
        const fps = Math.round(1000 / average);

        window.rybbit.event("frame-stats", {
            fps,
            fpsBucket: fps < 30 ? "<30" : fps < 50 ? "30-49" : fps < 100 ? "50-99" : "100+",
            refreshRate: Math.round(1000 / median),
            slowFramePct: Math.round((slowFrames / deltas.length) * 100),
            worstFrameMs: Math.round(sorted[sorted.length - 1]),
            scrolled,
            devicePixelRatio: Math.round(devicePixelRatio * 100) / 100,
            cpuCores: navigator.hardwareConcurrency ?? 0,
            reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
            bgMotion: motion.enabled,
        });
    };

    const loop = (now: number) => {
        if (last) {
            deltas.push(now - last);
        } else {
            start = now;
        }
        last = now;
        if (now - start >= sample_ms) {
            stop();
            report();
            return;
        }
        frame = requestAnimationFrame(loop);
    };

    // Skip the first moments after load, where hydration and image decoding cause unrelated jank.
    const warmup = setTimeout(() => {
        if (document.hidden) {
            return;
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        // Frames stop while the tab is hidden, so discard the measurement instead of reporting a skewed one.
        document.addEventListener("visibilitychange", stop);
        frame = requestAnimationFrame(loop);
    }, warmup_ms);

    return stop;
};
