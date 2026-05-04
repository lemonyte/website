<script lang="ts">
    import Card from "$lib/components/Card.svelte";
    import type { Post } from "$lib/posts";

    interface Props {
        posts: Post[];
        limit?: number;
    }

    const { posts, limit }: Props = $props();

    const dateOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    };
</script>

<div>
    <div class="grid grid-cols-1 gap-2">
        {#each limit ? posts.slice(0, limit) : posts as post}
            <Card
                title={post.title}
                href={`/blog/${post.slug}`}
                description={post.description}
                titleTags={[post.date.toLocaleDateString(undefined, dateOptions)]}
                bottomTags={post.tags}
            />
        {/each}
    </div>
</div>
