<script lang="ts">
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

<div class="bg-white dark:bg-black">
    {@render children()}
</div>
