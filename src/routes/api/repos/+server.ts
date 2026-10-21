import { GITHUB_TOKEN } from "$app/env/private";

import { githubUsername, pinnedRepoCount } from "#lib/config.ts";
import { getPinnedRepos } from "#lib/repos.ts";

export const prerender = false;

export const GET = async ({ fetch, request }) => {
    const cache = await caches.open("gh-api");
    const cached = await cache.match(request);
    if (cached) {
        return cached;
    }
    const response = Response.json(await getPinnedRepos(githubUsername, pinnedRepoCount, GITHUB_TOKEN, fetch), {
        headers: { "Cache-Control": "public, max-age=3600" },
    });
    await cache.put(request, response.clone());
    return response;
};
