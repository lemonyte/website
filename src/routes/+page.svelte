<script lang="ts">
    import Island from "$lib/components/Island.svelte";
    import Card from "$lib/components/Card.svelte";
    import IconLink from "$lib/components/IconLink.svelte";
    import PostList from "$lib/components/PostList.svelte";
    import { skills, links } from "$lib/data";
    import { posts } from "$lib/posts";

    const { data } = $props();
</script>

<div class="hidden fixed top-0 left-0 h-screen md:flex flex-col justify-center">
    <div class="flex flex-col items-center p-4 gap-4">
        {#each links as link}
            <IconLink {...link} />
        {/each}
    </div>
</div>

<div class="flex justify-center text-neutral-800 dark:text-neutral-200 mb-16">
    <div class="w-screen flex flex-col gap-6">
        <div class="flex items-center flex-col">
            <div class="h-screen flex flex-col justify-center">
                <h1 class="text-7xl sm:text-8xl md:text-9xl select-none opacity-90 mix-blend-luminosity">Lemonyte</h1>
            </div>
            <div
                class="flex md:hidden shrink-0 gap-4 text-neutral-700 dark:text-neutral-300 backdrop-blur-3xl p-4 rounded-xl bg-neutral-100/40 dark:bg-neutral-900/40"
            >
                {#each links as link}
                    <IconLink {...link} />
                {/each}
            </div>
        </div>
        <Island>
            <div class="max-w-none prose prose-neutral dark:prose-invert">
                <p>
                    Hi, I'm <strong class="font-semibold">Lemonyte</strong>, an open-sourcerer 🧙‍♂️ passionate about the
                    world of software and technology.
                </p>
                <ul class="p-4 list-disc">
                    <li>
                        ❤️ I love
                        <a href="https://github.com/lemonyte/terminal-player">terminals</a>
                        and making things that are
                        <a href="https://ferryplanner.ca">useful</a>
                        to others.
                    </li>
                    <li>
                        🧠 I'm always trying to expand my knowledge and skillset, so I'm learning Rust 🦀 right now.
                    </li>
                    <li>
                        💡 I like to learn about anything that sparks my interest, like
                        <a href="https://github.com/lemonyte/wastebin">web development</a>,
                        <a href="https://github.com/lemonyte/pyautotrace">image vectorization</a>,
                        <a href="https://github.com/lemonyte/russian-roulette-bot">Discord bots</a>, and
                        <a href="https://github.com/lemonyte/stegosaurus">cryptography</a>.
                    </li>
                    <li>
                        🔥 I believe in writing structured, readable, maintainable code, and occasionally having some
                        <a href="https://httpwaifus.com">fun</a>.
                    </li>
                    <li>
                        🤝 I'm quite
                        <a href="https://liberamanifesto.com">fond of open source</a>
                        and I'm always looking for ways to contribute and give back.
                    </li>
                    <li>
                        💭 I'm dreaming of a future where software and hardware exist in the hands of the people, for
                        the people, and by the people, without technological limitations.
                    </li>
                </ul>
            </div>
        </Island>
        <Island>
            <h2 class="text-2xl mb-4">Projects</h2>
            <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
                {#await data.reposPromise}
                    {#each Array(6) as _}
                        <Card />
                    {/each}
                {:then repos}
                    {#await repos.json() then repos}
                        {#each repos.slice(0, 6) as repo}
                            <Card
                                title={repo.repo}
                                href={repo.link}
                                description={repo.description}
                                tags={[repo.language]}
                            />
                        {/each}
                    {:catch error}
                        <pre class="text-red-500">{error.message}</pre>
                    {/await}
                {:catch error}
                    <pre class="text-red-500">{error.message}</pre>
                {/await}
            </div>
        </Island>
        <Island>
            <h2 class="text-2xl mb-4">Posts</h2>
            <PostList {posts} />
        </Island>
        <Island>
            <h2 class="text-2xl mb-4">Skills</h2>
            <div class="grid grid-cols-[repeat(auto-fit,minmax(40px,1fr))] gap-x-4 gap-y-4">
                {#each skills as skill}
                    <IconLink {...skill} />
                {/each}
            </div>
        </Island>
    </div>
</div>
