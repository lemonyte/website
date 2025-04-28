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
    class="flex flex-col p-3 rounded-lg transition select-none bg-neutral-200/40 hover:bg-neutral-300/40 dark:bg-neutral-900/40 dark:hover:bg-neutral-800/40"
>
    <div class="flex flex-col lg:flex-row gap-1">
        <span
            class={[
                "text-xl font-semibold text-ellipsis overflow-hidden whitespace-nowrap",
                { "animate-pulse": !title },
            ]}
        >
            {title || "Loading…"}
        </span>
        <div class="flex flex-row gap-2 shrink-0 lg:ml-auto items-center overflow-hidden">
            {#if tags}
                {#each tags as tag}
                    <Tag>{tag}</Tag>
                {/each}
            {/if}
        </div>
    </div>
    <span class={["text-neutral-500 dark:text-neutral-400 text-sm text-ellipsis overflow-hidden whitespace-nowrap", { "animate-pulse": !description }]}>
        {description || "Loading..."}
    </span>
</a>
