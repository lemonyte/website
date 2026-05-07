<script lang="ts">
    import Head from "$lib/components/Head.svelte";
    import Island from "$lib/components/Island.svelte";
    import PostList from "$lib/components/PostList.svelte";
    import Tag from "$lib/components/Tag.svelte";
    import { page } from "$app/state";
    import { posts, tags } from "$lib/posts";

    let tagFilter = $derived(page.url.searchParams.get("tag"));
    let filteredPosts = $derived(posts.filter((post) => (tagFilter ? post.tags.includes(tagFilter) : true)));
</script>

<Head title="Posts" description="Lemonyte's Blog" />

<Island>
    <h1 class="text-4xl font-semibold mb-4">Posts</h1>
    <div class="flex gap-2 flex-wrap mb-4 select-none">
        <a href="/blog">
            <Tag hover={true} selected={!tagFilter}>All</Tag>
        </a>
        {#each tags as tag}
            <a href={`/blog?tag=${encodeURIComponent(tag)}`}>
                <Tag hover={true} selected={tag === tagFilter}>
                    {tag}
                </Tag>
            </a>
        {/each}
    </div>
    <PostList posts={filteredPosts} />
</Island>
