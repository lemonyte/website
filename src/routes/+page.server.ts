import { GITHUB_TOKEN } from "$app/env/private";

import { githubUsername, pinnedRepoCount } from "#lib/config.ts";
import { getPinnedRepos } from "#lib/repos.ts";

export const load = async ({ fetch }) => {
    return {
        repos: await getPinnedRepos(githubUsername, pinnedRepoCount, GITHUB_TOKEN, fetch),
    };
};
