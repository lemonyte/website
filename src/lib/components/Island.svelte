<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children: Snippet;
    }

    const { children }: Props = $props();
</script>

<div class="flex flex-col items-center">
    <div class="w-full md:w-2/3 xl:w-1/2 p-4 md:p-6 backdrop-blur-3xl rounded-xl bg-neutral-100/40 dark:bg-neutral-900/40">
        {@render children()}
    </div>
</div>
