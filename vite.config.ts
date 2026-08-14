import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import remarkGithub from "remark-github";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCallouts from "rehype-callouts";
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        tailwindcss(),
        sveltekit({
            extensions: [".svelte", ".svx"],
            preprocess: [
                vitePreprocess(),
                mdsvex({
                    remarkPlugins: [remarkGithub],
                    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypeCallouts],
                }),
            ],
            adapter: adapter(),
        }),
    ],
});
