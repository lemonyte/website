<script lang="ts">
    import { motion } from "#lib/motion.svelte.ts";

    const label = $derived(`${motion.enabled ? "Pause" : "Play"} background animation`);
</script>

<button
    type="button"
    onclick={() => motion.toggle()}
    aria-label={label}
    title={label}
    class="inline-flex items-center gap-2 opacity-50 hover:opacity-100 transition duration-75 cursor-pointer"
>
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d={motion.enabled ? "M3 2h4v12H3zM9 2h4v12H9z" : "M4 2l10 6-10 6z"} />
    </svg>
    <span class="sm:hidden">Background animation</span>
</button>
