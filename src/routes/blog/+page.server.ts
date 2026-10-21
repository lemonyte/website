import { posts, tags } from "#lib/posts.ts";

export const load = () => {
    return { posts, tags };
};
