import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCallouts from "rehype-callouts";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    extensions: [".svelte", ".svx"],
    preprocess: [
        vitePreprocess(),
        mdsvex({
            rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypeCallouts],
        }),
    ],
    kit: {
        adapter: adapter(),
    },
};

export default config;
