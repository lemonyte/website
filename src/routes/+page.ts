export const load = async ({ fetch }) => {
    return {
        repos: fetch("https://gh-pinned-repos.egoist.dev/?username=lemonyte"),
    };
};
