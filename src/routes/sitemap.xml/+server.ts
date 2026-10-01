import { response } from "super-sitemap/sveltekit";
import { baseUrl } from "$lib/config";
import { posts } from "$lib/posts";

export const GET = async () => {
    const postLastmods = new Map(
        posts.map((post) => [`/blog/${post.slug}`, (post.updated ?? post.date).toISOString().slice(0, 10)]),
    );

    return await response({
        origin: baseUrl.toString().replace(/\/+$/, ""),
        processPaths: (paths) => paths.map((path) => ({ ...path, lastmod: postLastmods.get(path.path) ?? path.lastmod })),
    });
};
