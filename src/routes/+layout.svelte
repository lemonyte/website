<script lang="ts">
    import Blob from "$lib/components/Blob.svelte";
    import Island from "$lib/components/Island.svelte";
    import IconLink from "$lib/components/IconLink.svelte";
    import { links } from "$lib/data";
    import "../app.css";

    const { children } = $props();

    let mobileNavOpen = $state(false);
</script>

{#each Array(24) as _}
    <Blob />
{/each}

<div class="hidden fixed top-0 left-0 h-screen md:flex flex-col justify-center">
    <div class="flex flex-col items-center p-4 gap-4">
        {#each links as link}
            <IconLink {...link} />
        {/each}
    </div>
</div>

<div class="min-h-screen flex flex-col gap-8">
    <nav class="md:mt-4 select-none">
        <Island>
            <div class="flex flex-col sm:flex-row gap-4 sm:items-center">
                <span class="flex flex-row items-center">
                    <a href="/" class="link font-semibold text-xl">Lemonyte</a>
                    <button
                        class={[
                            "inline-flex items-center justify-center sm:hidden text-2xl ml-auto",
                            "w-8 h-8 rounded-md bg-neutral-300/40 dark:bg-neutral-700/40",
                        ]}
                        onclick={() => (mobileNavOpen = !mobileNavOpen)}
                    >
                        {mobileNavOpen ? "\u00D7" : "\u2261"}
                    </button>
                </span>
                <div class={["flex flex-col sm:flex-row gap-2 sm:flex sm:ml-auto", { hidden: !mobileNavOpen }]}>
                    <a href="/blog" class="link">Blog</a>
                    <span class="hidden sm:inline opacity-50">•</span>
                    <a href="/challenges" class="link">CTF Challenges</a>
                </div>
            </div>
        </Island>
    </nav>

    <div>
        {@render children()}
    </div>

    <footer class="mb-4 mt-auto">
        <Island>
            <div class="flex flex-row">
                <div class="flex flex-col gap-2">
                    <div class="prose prose-neutral dark:prose-invert text-sm">
                        © {new Date().getFullYear()} Lemonyte.<br />
                        Made with <a href="https://svelte.dev/">Svelte</a> and a keyboard.<br />
                        Powered by <a href="https://pages.dev">Cloudflare</a> and late-night debugging.
                    </div>
                    <div class="flex flex-row gap-3 shrink-0">
                        {#each links as link}
                            <IconLink {...link} width="24px" height="24px" />
                        {/each}
                    </div>
                </div>
                <div class="flex flex-row prose prose-neutral dark:prose-invert text-sm ml-auto">
                    <ul class="list-none">
                        <li><a href="/sitemap.xml">Sitemap</a></li>
                        <li><a href="/feed.xml">RSS/Atom feed</a></li>
                        <li><a href="https://github.com/lemonyte/website">Source</a></li>
                    </ul>
                </div>
            </div>
        </Island>
    </footer>
</div>
