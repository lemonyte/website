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
        selected ? "bg-fill/80" : "bg-fill/40",
        !selected && hover && "hover:bg-fill/60",
        selected === false && "opacity-80",
    ]}
>
    {@render children()}
</span>
