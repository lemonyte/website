<script lang="ts">
    import { page } from "$app/state";

    import Head from "#lib/components/Head.svelte";
    import Island from "#lib/components/Island.svelte";
    import JsonLd from "#lib/components/JsonLd.svelte";
    import PostList from "#lib/components/PostList.svelte";
    import Tag from "#lib/components/Tag.svelte";
    import * as config from "#lib/config.ts";
    import { posts, tags } from "#lib/posts.ts";

    const description =
        "Posts by Lemonyte about cybersecurity, malware analysis, Rust, Python, embedded systems, and more.";

    let tagFilter = $derived(page.url.searchParams.get("tag"));
    let filteredPosts = $derived(posts.filter((post) => (tagFilter ? post.tags.includes(tagFilter) : true)));
</script>

<Head title="Blog" {description} />
<JsonLd
    data={{
        "@type": "Blog",
        name: "Lemonyte's Blog",
        description,
        url: new URL("/blog", config.baseUrl).href,
        author: { "@id": config.personId },
        isPartOf: { "@id": config.websiteId },
        blogPost: posts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            url: new URL(`/blog/${post.slug}`, config.baseUrl).href,
            datePublished: post.date.toISOString(),
        })),
    }}
/>

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
