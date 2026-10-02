export interface Repository {
    name: string;
    owner: { login: string };
    url: string;
    description: string | null;
    openGraphImageUrl: string;
    homepageUrl: string | null;
    primaryLanguage: { name: string; color: string | null } | null;
    stargazerCount: number;
    forkCount: number;
}

const query = `
    query ($username: String!, $count: Int!) {
        user(login: $username) {
            pinnedItems(first: $count, types: REPOSITORY) {
                nodes {
                    ... on Repository {
                        name
                        owner { login }
                        url
                        description
                        openGraphImageUrl
                        homepageUrl
                        primaryLanguage { name color }
                        stargazerCount
                        forkCount
                    }
                }
            }
        }
    }
`;

export async function getPinnedRepos(
    username: string,
    count: number,
    token: string,
    fetch = globalThis.fetch,
): Promise<Repository[]> {
    const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "User-Agent": username,
        },
        body: JSON.stringify({ query, variables: { username, count } }),
    });
    if (!response.ok) {
        throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`);
    }
    const { data, errors } = (await response.json()) as {
        data?: { user: { pinnedItems: { nodes: Repository[] } } | null };
        errors?: { message: string }[];
    };
    if (errors?.length || !data?.user) {
        throw new Error(`GitHub API request failed: ${errors?.[0]?.message ?? "user not found"}`);
    }
    return data.user.pinnedItems.nodes;
}
