<script lang="ts">
    import { page } from "$app/state";
    import Blob from "$lib/components/Blob.svelte";
    import Island from "$lib/components/Island.svelte";
    import "../app.css";

    const { children } = $props();
</script>

<svelte:head>
    <title>Lemonyte</title>
    <meta
        name="description"
        content="Open-source developer and computer science student. Explore my skills, projects, and more."
    />
</svelte:head>

{#if page.url.pathname !== "/"}
    <nav class="mb-8 md:mt-4">
        <Island>
            <div class="flex flex-row gap-4 items-center">
                <span class="font-semibold text-lg">Lemonyte</span>
                <span class="opacity-50">•</span>
                <a href="/" class="link">Home</a>
                <span class="opacity-50">•</span>
                <a href="/blog" class="link">Blog</a>
            </div>
        </Island>
    </nav>
{/if}

{#each Array(24) as _}
    <Blob />
{/each}

{@render children()}
