<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children: Snippet<[]>;
    }

    const { children }: Props = $props();
</script>

<div class="flex flex-col items-center">
    <div class="w-11/12 md:w-2/3 p-6 backdrop-blur-3xl rounded-xl bg-neutral-100/40 dark:bg-neutral-900/40">
        {@render children()}
    </div>
</div>
