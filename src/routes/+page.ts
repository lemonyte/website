export const load = async ({ fetch }) => {
    return {
        reposResponse: fetch("https://gh-pinned-repos--master.deno.dev/?username=lemonyte"),
    };
};
