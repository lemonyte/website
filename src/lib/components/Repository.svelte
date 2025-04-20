<script lang="ts">
    interface Props {
        repo?: string;
        link?: string;
        description?: string;
        language?: string;
    }

    const { repo = "", link = "", description = "", language = "" }: Props = $props();
</script>

<a
    href={link}
    class="p-3 rounded-lg transition select-none bg-neutral-100/40 hover:bg-neutral-200/40 dark:bg-neutral-900/40 dark:hover:bg-neutral-800/40"
>
    <div class="justify-between flex flex-row">
        <div class={["text-xl overflow-hidden text-ellipsis whitespace-nowrap", { "animate-pulse": !repo }]}>
            {repo || "Loading…"}
        </div>
        {#if language}
            <div class="p-1 text-xs rounded-md items-center flex bg-neutral-300/40 dark:bg-neutral-700/40">
                {language}
            </div>
        {/if}
    </div>
    <div class={["text-neutral-500 text-sm line-clamp-1", { "animate-pulse": !repo }]}>
        {description || "Loading..."}
    </div>
</a>
