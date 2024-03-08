export const load = async ({ fetch }) => {
    return {
        repos: await fetch("https://gh-pinned-repos--master.deno.dev/?username=lemonyte"),
    };
};
