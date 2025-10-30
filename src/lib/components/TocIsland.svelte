<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children: Snippet;
    }

    const { children }: Props = $props();
</script>

<div class="absolute right-4 h-full select-none hidden xl:block w-1/5">
    <!--
        The `prose` and `not-prose` classes in the same class list is intentional.
        We want the typography variables to be available in the TOC
        but without applying all the default typography styling.
    -->
    <div
        class={[
            "p-2 backdrop-blur-3xl rounded-xl bg-neutral-100/40 dark:bg-neutral-900/40",
            "sticky top-4 prose not-prose prose-neutral dark:prose-invert",
        ]}
    >
        {@render children()}
    </div>
</div>
