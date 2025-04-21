<script lang="ts" module>
    import img from "$lib/components/LazyImg.svelte";
    export { img };
</script>

<script lang="ts">
    import Island from "$lib/components/Island.svelte";
    import PostList from "$lib/components/PostList.svelte";
    import Tag from "$lib/components/Tag.svelte";
    import { url } from "$lib/config";

    const { children, data } = $props();
    const { post, posts } = $derived(data);

    const dateOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
</script>

<main>
    <Island>
        <article>
            <div class="flex flex-col gap-2">
                {#if post}
                    <h1 class="text-4xl font-semibold">{post.title}</h1>
                    <div class="text-neutral-500 dark:text-neutral-400">
                        <span>Published {post.date.toLocaleDateString(undefined, dateOptions)}</span>
                        {#if post.updated}
                            <span> • </span>
                            <span>
                                Updated {post.updated.toLocaleDateString(undefined, dateOptions)}
                            </span>
                        {/if}
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
                {@render children()}
            </div>
        </article>
    </Island>
</main>

<aside class="mt-16">
    <Island>
        <h2 class="text-2xl mb-4">More Posts</h2>
        <PostList posts={posts.filter((otherPost) => otherPost.slug !== post.slug)} limit={3} />
    </Island>
</aside>
