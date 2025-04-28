<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children: Snippet;
        hover?: boolean;
    }
    const { children, hover = false }: Props = $props();
</script>

<span
    class={[
        "text-sm line-clamp-1 capitalize p-1 rounded-md bg-neutral-300/40 dark:bg-neutral-700/40",
        hover && "transition hover:bg-neutral-300/80 dark:hover:bg-neutral-700/80",
    ]}
>
    {@render children()}
</span>
