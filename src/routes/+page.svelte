<script lang="ts">
    import Card from "$lib/components/Card.svelte";
    import Head from "$lib/components/Head.svelte";
    import Island from "$lib/components/Island.svelte";
    import IconLink from "$lib/components/IconLink.svelte";
    import PostList from "$lib/components/PostList.svelte";
    import ChallengeList from "$lib/components/ChallengeList.svelte";
    import { skills, links } from "$lib/data";
    import { posts } from "$lib/posts";
    import { challenges } from "$lib/challenges";

    const { data } = $props();
</script>

<Head />

<div class="hidden fixed top-0 left-0 h-screen md:flex flex-col justify-center">
    <div class="flex flex-col items-center p-4 gap-4">
        {#each links as link}
            <IconLink {...link} />
        {/each}
    </div>
</div>

<div class="flex justify-center text-neutral-800 dark:text-neutral-200">
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
                    👋 Hi, I'm <b>Lemonyte</b>. Open-sourcerer, IT student, STEM teacher, and aspiring cybersecurity
                    researcher.
                </p>
                <ul class="p-4 list-disc">
                    <li>
                        ❤️ I love
                        <a href="/blog/beamng-malware">cybersecurity</a>,
                        <a href="https://github.com/lemonyte/terminal-player">terminals</a>, and making things that are
                        <a href="https://ferryplanner.ca">useful</a>
                        to others.
                    </li>
                    <li>
                        🧠 I'm always trying to expand my knowledge and skillset, so I'm
                        <a href="https://github.com/lemonyte/dvd-screensaver">learning Rust</a> 🦀 right now.
                    </li>
                    <li>
                        💡 I like to learn about anything that sparks my interest, like
                        <a href="https://github.com/lemonyte/website">web development</a>,
                        <a href="https://github.com/lemonyte/pyautotrace">image vectorization</a>,
                        <a href="https://github.com/lemonyte/safe-exec">malware analysis</a>,
                        <a href="https://github.com/lemonyte/russian-roulette-bot">Discord bots</a>, and
                        <a href="https://github.com/lemonyte/stegosaurus">cryptography</a> to name a few.
                    </li>
                    <li>
                        🔥 I care about user experience, system reliability, security, and occasionally having some
                        <a href="https://httpwaifus.com">fun</a>.
                    </li>
                    <li>
                        🔎 I enjoy dabbling in areas like reverse engineering,
                        <a href="https://solve.whcc.club/exec">CTF challenges</a>, obfuscation,
                        <a href="https://wikipedia.org/wiki/Quine_(computing)">quines</a>, and
                        <a href="https://github.com/lemonyte/_">weird things no one asked for</a>.
                    </li>
                    <li>
                        🤝 I'm quite
                        <a href="https://liberamanifesto.com">fond of open source</a>
                        and I'm always looking for ways to
                        <a href="https://github.com/microsoft/PowerToys/pull/38052">contribute</a> and
                        <a href="https://github.com/pydantic/bump-pydantic/pull/92">give back</a>.
                    </li>
                    <li>🔧 I mostly work in Python, JavaScript/TypeScript, HTML & CSS, Rust, and Svelte.</li>
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
            <h2 class="text-2xl mb-4"><a href="/blog" class="link">Posts</a></h2>
            <PostList {posts} />
        </Island>
        <Island>
            <h2 class="text-2xl mb-4"><a href="/challenges" class="link">CTF Challenges</a></h2>
            <ChallengeList {challenges} />
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
