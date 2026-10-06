import { challenges } from "#lib/challenges.ts";
import { findBySlug } from "#lib/slug.ts";

export const prerender = true;

export const load = ({ url }) => {
    return { challenges, challenge: findBySlug(challenges, url, "Challenge") };
};
