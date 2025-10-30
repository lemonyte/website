<script lang="ts">
    import Blob from "$lib/components/Blob.svelte";
    import Island from "$lib/components/Island.svelte";
    import "../app.css";

    const { children } = $props();

    let mobileNavOpen = $state(false);
</script>

{#each Array(24) as _}
    <Blob />
{/each}

<div class="min-h-screen flex flex-col">
    <nav class="mb-8 md:mt-4 select-none">
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

    <div class="mb-16">
        {@render children()}
    </div>
</div>
