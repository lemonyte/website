<script lang="ts">
    import Tag from "./Tag.svelte";

    interface Props {
        title?: string;
        href?: string;
        description?: string;
        tags?: string[];
        tagPosition?: "title" | "bottom";
    }

    const { title = "", href = "", description = "", tags = [], tagPosition = "bottom" }: Props = $props();
</script>

<a
    {href}
    class={[
        "flex flex-col p-3 rounded-lg transition select-none",
        "bg-neutral-200/40 hover:bg-neutral-300/40 dark:bg-neutral-900/40 dark:hover:bg-neutral-800/40",
    ]}
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
        {#if tags && tagPosition === "title"}
            <div class="flex flex-row gap-2 shrink-0 lg:ml-auto items-center overflow-hidden">
                {#each tags as tag}
                    <Tag>{tag}</Tag>
                {/each}
            </div>
        {/if}
    </div>
    <span
        class={[
            "text-neutral-500 dark:text-neutral-400 text-sm text-ellipsis overflow-hidden whitespace-nowrap",
            { "animate-pulse": !description },
        ]}
    >
        {description || "Loading..."}
    </span>
    {#if tagPosition === "bottom"}
        <div class="flex flex-row gap-2 mt-2 shrink-0 items-center overflow-hidden">
            {#if tags.length}
                {#each tags as tag}
                    <Tag>{tag}</Tag>
                {/each}
            {:else}
                <Tag>Loading...</Tag>
            {/if}
        </div>
    {/if}
</a>
