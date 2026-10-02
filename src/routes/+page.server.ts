import { GITHUB_TOKEN } from "$app/env/private";

import { getPinnedRepos } from "#lib/repos.ts";

export const load = async ({ fetch }) => {
    return {
        repos: await getPinnedRepos("lemonyte", 6, GITHUB_TOKEN, fetch),
    };
};
