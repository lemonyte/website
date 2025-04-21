import { posts } from "$lib/posts";
import { error } from "@sveltejs/kit";

export const load = ({ params }) => {
    const { tag } = params;
    if (tag) {
        const filteredPosts = posts.filter((post) => post.tags.includes(tag.toLowerCase()));
        if (filteredPosts.length === 0) {
            throw error(404, `Tag not found: ${tag}`);
        }
        return { tag, posts: filteredPosts };
    }
    return { tag, posts };
};
