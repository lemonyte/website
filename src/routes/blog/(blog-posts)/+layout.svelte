<script lang="ts">
    import Toc from "svelte-toc";

    import Comments from "#lib/components/Comments.svelte";
    import Head from "#lib/components/Head.svelte";
    import Island from "#lib/components/Island.svelte";
    import JsonLd from "#lib/components/JsonLd.svelte";
    import PostList from "#lib/components/PostList.svelte";
    import Tag from "#lib/components/Tag.svelte";
    import TocIsland from "#lib/components/TocIsland.svelte";
    import * as config from "#lib/config.ts";

    const { children, data } = $props();
    const { post, posts } = $derived(data);

    const dateOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
</script>

<Head title={post.title} description={post.description} type="article" image={post.image} imageAlt={post.imageAlt}>
    <meta property="article:published_time" content={post.date.toISOString()} />
    {#if post.updated}
        <meta property="article:modified_time" content={post.updated.toISOString()} />
    {/if}
    {#each post.authors as author}
        <meta property="article:author" content={author.url ?? author.name} />
    {/each}
    {#each post.tags as tag}
        <meta property="article:tag" content={tag} />
    {/each}
</Head>
<JsonLd
    data={{
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        url: new URL(`/blog/${post.slug}`, config.baseUrl).href,
        mainEntityOfPage: new URL(`/blog/${post.slug}`, config.baseUrl).href,
        datePublished: post.date.toISOString(),
        dateModified: (post.updated ?? post.date).toISOString(),
        ...(post.image && { image: new URL(post.image, config.baseUrl).href }),
        author: post.authors.map((author) => ({
            "@type": "Person",
            ...(author.url === config.baseUrl.href && { "@id": config.personId }),
            name: author.name,
            url: author.url,
        })),
        keywords: post.tags,
        isPartOf: { "@id": config.websiteId },
    }}
/>

<div class="relative">
    <TocIsland>
        <!-- Render TOC titles as paragraphs so they don't add headings to the page outline. -->
        <Toc>
            {#snippet titleSnippet()}
                <p class="toc-title toc-exclude">On this page</p>
            {/snippet}
        </Toc>
    </TocIsland>

    <main>
        <Island>
            <article>
                <div class="flex flex-col gap-2">
                    <h1 class="text-4xl font-semibold">{post.title}</h1>
                    <div>
                        {#if post.authors.length}
                            <span class="inline-flex flex-row w-min">
                                {#each post.authors as author, index}
                                    <a href={author.url} class="link">{author.name}</a>
                                    {#if index < post.authors.length - 1}
                                        <span class="text-neutral-500 dark:text-neutral-400">,&nbsp;</span>
                                    {/if}
                                {/each}
                            </span>
                            <span class="text-neutral-500 dark:text-neutral-400"> • </span>
                        {/if}
                        <span class="text-neutral-500 dark:text-neutral-400">
                            <time datetime={post.date.toISOString()}>
                                {post.date.toLocaleDateString(undefined, dateOptions)}
                            </time>
                            {#if post.updated}
                                <span> • </span>
                                <span>
                                    Updated
                                    <time datetime={post.updated.toISOString()}>
                                        {post.updated.toLocaleDateString(undefined, dateOptions)}
                                    </time>
                                </span>
                            {/if}
                        </span>
                    </div>
                    {#if post.tags.length}
                        <div class="flex flex-row gap-2">
                            {#each post.tags as tag}
                                <a href={`/blog?tag=${encodeURIComponent(tag)}`}>
                                    <Tag hover={true}>{tag}</Tag>
                                </a>
                            {/each}
                        </div>
                    {/if}
                </div>
                <div class="mt-8 max-w-none prose prose-neutral dark:prose-invert">
                    {#if post.image}
                        <img src={post.image} alt={post.imageAlt ?? ""} fetchpriority="high" />
                    {/if}
                    <div class="xl:hidden">
                        <Toc breakpoint={0}>
                            {#snippet titleSnippet()}
                                <p class="toc-title toc-exclude">Table of contents</p>
                            {/snippet}
                        </Toc>
                    </div>
                    {@render children()}
                </div>
            </article>
        </Island>
    </main>

    <aside class="mt-8">
        <Island>
            {#key post.slug}
                <Comments />
            {/key}
        </Island>
    </aside>

    <aside class="mt-8">
        <Island>
            <h2 class="text-2xl mb-4 toc-exclude"><a href="/blog" class="link">Read next</a></h2>
            <PostList posts={posts.filter((otherPost) => otherPost.slug !== post.slug)} limit={3} />
        </Island>
    </aside>
</div>
