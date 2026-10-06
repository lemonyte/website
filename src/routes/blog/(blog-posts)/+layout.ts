import { posts } from "#lib/posts.ts";
import { findBySlug } from "#lib/slug.ts";

export const prerender = true;

export const load = ({ url }) => {
    return { posts, post: findBySlug(posts, url, "Post") };
};
