<script lang="ts">
    import Island from "$lib/components/Island.svelte";
    import PostList from "$lib/components/PostList.svelte";
    import Head from "$lib/components/Head.svelte";

    const { data } = $props();
</script>

<Head title={data.tag ? `Posts on ${data.tag}` : "Posts"} description="Lemonyte's Blog" />

<Island>
    <h1 class="text-4xl font-semibold mb-4">
        {#if data.tag}
            Posts on <span class="capitalize">{data.tag}</span>
        {:else}
            Posts
        {/if}
    </h1>
    <PostList posts={data.posts} />
</Island>
