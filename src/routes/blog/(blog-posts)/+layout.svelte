<script lang="ts" module>
    import img from "$lib/components/LazyImg.svelte";
    export { img };
</script>

<script lang="ts">
    import Island from "$lib/components/Island.svelte";
    import PostList from "$lib/components/PostList.svelte";
    import Tag from "$lib/components/Tag.svelte";
    import Head from "$lib/components/Head.svelte";
    import TocIsland from "$lib/components/TocIsland.svelte";
    import Toc from "svelte-toc";
    import Giscus from "@giscus/svelte";

    const { children, data } = $props();
    const { post, posts } = $derived(data);

    const dateOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
</script>

<Head title={post.title} description={post.description} type="article" image={post.image}>
    <meta property="og:article:published_time" content={post.date.toISOString()} />
    {#if post.updated}
        <meta property="og:article:modified_time" content={post.updated.toISOString()} />
    {/if}
    {#each post.authors as author}
        <meta property="og:article:author" content={author.name} />
    {/each}
    {#each post.tags as tag}
        <meta property="og:article:tag" content={tag} />
    {/each}
</Head>

<div class="relative">
    <TocIsland>
        <Toc />
    </TocIsland>

    <main>
        <Island>
            <article>
                <div class="flex flex-col gap-2">
                    {#if post}
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
                                <span>{post.date.toLocaleDateString(undefined, dateOptions)}</span>
                                {#if post.updated}
                                    <span> • </span>
                                    <span>
                                        Updated {post.updated.toLocaleDateString(undefined, dateOptions)}
                                    </span>
                                {/if}
                            </span>
                        </div>
                        {#if post.tags.length}
                            <div class="flex flex-row gap-2">
                                {#each post.tags as tag}
                                    <Tag hover={true}><a href={`/blog/${tag}`}>{tag}</a></Tag>
                                {/each}
                            </div>
                        {/if}
                    {/if}
                </div>
                <div class="mt-8 max-w-none prose prose-neutral dark:prose-invert">
                    <div class="xl:hidden">
                        <Toc breakpoint={0} title="Table of contents" />
                    </div>
                    {#if post.image}
                        <img src={post.image} alt="Banner" />
                    {/if}
                    {@render children()}
                </div>
            </article>
        </Island>
    </main>

    <aside class="mt-8">
        <Island>
            <Giscus
                id="comments"
                repo="lemonyte/website"
                repoId="R_kgDOKC4xmg"
                category="Giscus comments"
                categoryId="DIC_kwDOKC4xms4CqA6y"
                mapping="pathname"
                term=""
                strict="1"
                reactionsEnabled="1"
                inputPosition="top"
                theme="transparent_dark"
                lang="en"
                loading="lazy"
            />
        </Island>
    </aside>

    <aside class="mt-8">
        <Island>
            <h2 class="text-2xl mb-4 toc-exclude"><a href="/blog" class="link">Read next</a></h2>
            <PostList posts={posts.filter((otherPost) => otherPost.slug !== post.slug)} limit={3} />
        </Island>
    </aside>
</div>
