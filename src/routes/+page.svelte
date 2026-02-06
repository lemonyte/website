<script lang="ts">
    import Card from "$lib/components/Card.svelte";
    import Head from "$lib/components/Head.svelte";
    import Island from "$lib/components/Island.svelte";
    import IconLink from "$lib/components/IconLink.svelte";
    import PostList from "$lib/components/PostList.svelte";
    import ChallengeList from "$lib/components/ChallengeList.svelte";
    import { skills } from "$lib/data";
    import { posts } from "$lib/posts";
    import { challenges } from "$lib/challenges";
    import type { Repository } from "$lib/repos";

    const { data } = $props();
</script>

<Head />

<div class="flex justify-center text-neutral-800 dark:text-neutral-200">
    <div class="w-screen flex flex-col gap-6">
        <Island>
            <main>
                <div class="max-w-none prose prose-neutral dark:prose-invert">
                    <h2 class="font-normal">👋 Hi, I'm <b>Lemonyte</b></h2>
                    <p>Open-sourcerer, IT student, STEM teacher, and aspiring cybersecurity researcher.</p>
                    <ul class="px-4 list-disc">
                        <li>
                            🧠 I look for places where I can apply my skills, tackle challenges, leave a positive
                            impact, and use the experience to improve myself in a positive feedback loop.
                        </li>
                        <li>
                            ❤️ I love
                            <a href="/blog/beamng-malware">cybersecurity</a>,
                            <a href="https://github.com/lemonyte/terminal-player">terminals</a>, and making things that
                            are
                            <a href="https://ferryplanner.ca">useful</a>
                            to others.
                        </li>
                        <li>
                            💡 I like to learn about anything that sparks my interest, such as
                            <a href="https://github.com/lemonyte/website">web development</a>,
                            <a href="https://pyautotrace.lemonyte.com">image vectorization</a>,
                            <a href="https://github.com/lemonyte/safe-exec">malware analysis</a>,
                            <a href="https://github.com/lemonyte/russian-roulette-bot">Discord bots</a>, and
                            <a href="https://github.com/lemonyte/stegosaurus">cryptography</a> to name a few.
                        </li>
                        <li>
                            🔎 I enjoy dabbling in areas like reverse engineering,
                            <a href="/challenges/exec">CTF challenges</a>,
                            <a href="https://github.com/lemonyte/no-code">obfuscation</a>,
                            <a href="https://wikipedia.org/wiki/Quine_(computing)">quines</a>, and
                            <a href="https://github.com/lemonyte/_">weird things no one asked for</a>.
                        </li>
                        <li>
                            🔥 I care about user experience, system reliability, security, and occasionally having some
                            <a href="https://httpwaifus.com">fun</a>.
                        </li>
                        <li>
                            🤝 I'm quite
                            <a href="https://liberamanifesto.com">fond of open source</a>
                            and I'm always looking for ways to
                            <a href="https://github.com/microsoft/PowerToys/pull/38052">contribute</a> and
                            <a href="https://github.com/pydantic/bump-pydantic/pull/92">give back</a>.
                        </li>
                        <li>🔧 I mostly work in Python, JavaScript/TypeScript, HTML & CSS, Svelte, and Rust, with some C and Go on the side.</li>
                    </ul>
                    <h2 class="font-normal">What I'm doing now</h2>
                    <p>These days I'm...</p>
                    <ul>
                        <li>
                            Solving interesting problems in the Embedded Systems department of my university's
                            <a href="https://en.wikipedia.org/wiki/Formula_Student">Formula Student</a> team, mostly related
                            to vehicle telemetry and software quality.
                        </li>
                        <li>
                            Developing a new social media app with a team of fellow students. It aims to bring people
                            together without the drawbacks of mainstream platforms.
                        </li>
                        <li>
                            Dipping my toes into LAN parties, by helping organize one at my university and acting as
                            webmaster.
                        </li>
                        <li>
                            Contributing to <a href="https://contiguity.com/">Contiguity</a>'s
                            <a href="https://github.com/contiguity/python">Python SDK</a>.
                        </li>
                        <li>Reviving my bass guitar skills with an old (but solid!) Ibanez GSR200 PJ.</li>
                        <li>
                            Attempting to adapt to a <a href="https://polysleep.org/wiki/E2">polyphasic</a> sleep schedule.
                        </li>
                        <li>Working through my ever-growing backlog of personal projects and future blog posts...</li>
                    </ul>
                </div>
            </main>
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
            <h2 class="text-2xl mb-4">Projects</h2>
            <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
                {#await data.reposPromise}
                    {#each Array(6) as _}
                        <Card tagPosition="title" />
                    {/each}
                {:then repos}
                    {#await repos.json() then repos}
                        {#each (repos as Repository[]).slice(0, 6) as repo}
                            <Card
                                title={repo.repo}
                                href={repo.website || repo.link}
                                description={repo.description}
                                tags={[repo.language]}
                                tagPosition="title"
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
            <h2 class="text-2xl mb-4">Skills</h2>
            <div class="grid grid-cols-[repeat(auto-fit,minmax(40px,1fr))] gap-x-4 gap-y-4">
                {#each skills as skill}
                    <IconLink {...skill} />
                {/each}
            </div>
        </Island>
    </div>
</div>
