<script lang="ts">
    import Blob from "$lib/components/Blob.svelte";
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

{#each Array(24) as _}
    <Blob />
{/each}

{@render children()}
