export const load = async ({ fetch }) => {
    return {
        repos: fetch("https://gh-pinned-repos--master.deno.dev/?username=lemonyte"),
    };
};
