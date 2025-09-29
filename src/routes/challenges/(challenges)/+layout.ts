import { error } from "@sveltejs/kit";
import { challenges } from "$lib/challenges";

export const prerender = true;

export const load = ({ url }) => {
    const slug = url.pathname.replace(/\/+$/, "").split("/").at(-1);
    const challenge = challenges.find((challenge) => challenge.slug === slug);
    if (!challenge) {
        error(404, `Challenge not found: ${slug}`);
    }
    return { challenges, challenge };
};
