import adapter from "@sveltejs/adapter-cloudflare";
import { sveltekit } from "@sveltejs/kit/vite";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import { mdsvex } from "mdsvex";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCallouts from "rehype-callouts";
import rehypeSlug from "rehype-slug";
import remarkGithub from "remark-github";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        tailwindcss(),
        sveltekit({
            extensions: [".svelte", ".svx"],
            preprocess: [
                vitePreprocess(),
                mdsvex({
                    // @ts-expect-error mdsvex's types target unified 9, these plugins target unified 11; they work at runtime.
                    remarkPlugins: [remarkGithub],
                    // @ts-expect-error mdsvex's types target unified 9, these plugins target unified 11; they work at runtime.
                    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypeCallouts],
                }),
            ],
            adapter: adapter(),
        }),
    ],
});
