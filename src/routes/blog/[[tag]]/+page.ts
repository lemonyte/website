import { posts } from "$lib/posts";
import { error } from "@sveltejs/kit";

export const load = ({ params }) => {
    const { tag } = params;
    if (tag) {
        const filteredPosts = posts.filter((post) =>
            post.tags.map((tag) => tag.toLowerCase()).includes(tag.toLowerCase()),
        );
        if (filteredPosts.length === 0) {
            throw error(404, `Post or tag not found: ${tag}`);
        }
        return { tag, posts: filteredPosts };
    }
    return { tag, posts };
};
