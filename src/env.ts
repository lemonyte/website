import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
    GITHUB_TOKEN: {
        description: "GitHub token used to fetch pinned repositories from the GraphQL API.",
    },
});
