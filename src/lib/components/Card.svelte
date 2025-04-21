<script lang="ts">
    import Tag from "./Tag.svelte";

    interface Props {
        title?: string;
        href?: string;
        description?: string;
        tags?: string[];
    }

    const { title = "", href = "", description = "", tags = [] }: Props = $props();
</script>

<a
    {href}
    class="p-3 rounded-lg transition select-none bg-neutral-200/40 hover:bg-neutral-300/40 dark:bg-neutral-900/40 dark:hover:bg-neutral-800/40"
>
    <div class="flex flex-row gap-2">
        <div
            class={[
                "text-xl font-semibold mr-auto overflow-hidden text-ellipsis whitespace-nowrap",
                { "animate-pulse": !title },
            ]}
        >
            {title || "Loading…"}
        </div>
        {#if tags}
            {#each tags as tag}
                <Tag>{tag}</Tag>
            {/each}
        {/if}
    </div>
    <div class={["text-neutral-500 dark:text-neutral-400 text-sm line-clamp-1", { "animate-pulse": !description }]}>
        {description || "Loading..."}
    </div>
</a>
