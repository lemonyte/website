import { GITHUB_TOKEN } from "$app/env/private";

import { getPinnedRepos } from "#lib/repos.ts";

export const prerender = false;

export const GET = async ({ fetch }) => {
    return Response.json(await getPinnedRepos("lemonyte", 6, GITHUB_TOKEN, fetch), {
        headers: { "Cache-Control": "public, max-age=3600" },
    });
};
