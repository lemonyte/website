import { error } from "@sveltejs/kit";
import { posts } from "$lib/posts";

export const prerender = true;

export const load = ({ url }) => {
    const slug = url.pathname.replace(/\/+$/, "").split("/").at(-1);
    const post = posts.find((post) => post.slug === slug);
    if (!post) {
        error(404, `Post not found: ${slug}`);
    }
    return { posts, post };
};
