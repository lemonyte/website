<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children: Snippet;
        hover?: boolean;
        selected?: boolean;
    }
    const { children, hover = false, selected }: Props = $props();
</script>

<span
    class={[
        "text-sm whitespace-nowrap text-ellipsis overflow-hidden capitalize p-1 rounded-md",
        hover && "cursor-pointer transition hover:opacity-100",
        selected ? "bg-neutral-400/80 dark:bg-neutral-600/80" : "bg-neutral-400/40 dark:bg-neutral-600/40",
        !selected && hover && "hover:bg-neutral-400/60 dark:hover:bg-neutral-600/60",
        selected === false && "opacity-80",
    ]}
>
    {@render children()}
</span>
