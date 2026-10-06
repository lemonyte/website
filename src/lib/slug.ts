import { error } from "@sveltejs/kit";

/**
 * Find the item whose slug matches the last path segment of `url`, or throw a 404 naming the missing `kind`.
 */
export const findBySlug = <T extends { slug: string }>(items: T[], url: URL, kind: string): T => {
    const slug = url.pathname.replace(/\/+$/, "").split("/").at(-1);
    const item = items.find((item) => item.slug === slug);
    if (!item) {
        error(404, `${kind} not found: ${slug}`);
    }
    return item;
};
