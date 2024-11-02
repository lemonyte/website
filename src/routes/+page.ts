export const load = ({ fetch }) => {
    return {
        reposResponse: fetch("https://gh-pinned-repos-tsj7ta5xfhep.deno.dev/?username=lemonyte"),
    };
};
