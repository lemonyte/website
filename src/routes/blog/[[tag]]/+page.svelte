<script lang="ts">
    import Island from "$lib/components/Island.svelte";
    import PostList from "$lib/components/PostList.svelte";

    const { data } = $props();
</script>

<Island>
    <h1 class="text-2xl mb-4">
        {#if data.tag}
            Posts on <span class="capitalize">{data.tag}</span>
        {:else}
            Posts
        {/if}
    </h1>
    <PostList posts={data.posts} />
</Island>
