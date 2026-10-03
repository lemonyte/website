<script lang="ts">
    import { onMount } from "svelte";

    import { challenges } from "#lib/challenges.ts";
    import Card from "#lib/components/Card.svelte";
    import ChallengeList from "#lib/components/ChallengeList.svelte";
    import Head from "#lib/components/Head.svelte";
    import IconLink from "#lib/components/IconLink.svelte";
    import Island from "#lib/components/Island.svelte";
    import JsonLd from "#lib/components/JsonLd.svelte";
    import PostList from "#lib/components/PostList.svelte";
    import * as config from "#lib/config.ts";
    import { links, skills } from "#lib/data.ts";
    import { posts } from "#lib/posts.ts";
    import type { Repository } from "#lib/repos.ts";

    const { data } = $props();

    let freshRepos: Repository[] | undefined = $state();
    const repos = $derived(freshRepos ?? data.repos);

    onMount(async () => {
        try {
            const response = await fetch("/api/repos");
            if (response.ok) {
                freshRepos = await response.json();
            }
        } catch {
            // Keep the prerendered list.
        }
    });
</script>

<Head />
<JsonLd
    data={{
        "@graph": [
            {
                "@type": "WebSite",
                "@id": config.websiteId,
                url: config.baseUrl.href,
                name: config.siteName,
                description: config.description,
                author: { "@id": config.personId },
            },
            {
                "@type": "Person",
                "@id": config.personId,
                name: config.siteName,
                url: config.baseUrl.href,
                description: config.tagline,
                sameAs: links
                    .filter((link) => link.rel === "me" && link.url.startsWith("https://"))
                    .map((link) => link.url),
            },
        ],
    }}
/>

<div class="flex justify-center text-neutral-800 dark:text-neutral-200">
    <div class="w-screen flex flex-col gap-6">
        <Island>
            <main>
                <div class="max-w-none prose prose-neutral dark:prose-invert">
                    <h1 class="font-normal text-2xl mb-6">👋 Hi, I'm <b>Lemonyte</b></h1>
                    <p>Open-sourcerer, cybersecurity student, STEM teacher, and motorsport enthusiast.</p>
                    <ul class="px-4 list-disc">
                        <li>
                            🧠 I look for hard problems where I can put my skills to use, make a difference, and come
                            out better at what I do.
                        </li>
                        <li>
                            ❤️ I love
                            <a href="/blog/beamng-malware">cybersecurity</a>, computer
                            <a href="https://mqtt-udp.lemonyte.com/protocol/">networks</a>,
                            <a href="https://github.com/lemonyte/terminal-player">terminals</a>, and making things that
                            are
                            <a href="https://ferryplanner.ca">useful</a>
                            to others.
                        </li>
                        <li>
                            💡 I like to learn by building things related to whatever sparks my interest.
                            <a href="https://github.com/lemonyte/website">Web development</a>,
                            <a href="https://pyautotrace.lemonyte.com">image vectorization</a>,
                            <a href="https://github.com/lemonyte/safe-exec">malware analysis</a>,
                            <a href="https://github.com/lemonyte/russian-roulette-bot">Discord bots</a>, and
                            <a href="https://github.com/lemonyte/stegosaurus">cryptography</a> to name a few.
                        </li>
                        <li>
                            🔎 I also dabble in areas like reverse engineering,
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
                            🤝 I'm
                            <a href="https://liberamanifesto.com">fond of open source</a>
                            and always looking for ways to
                            <a href="https://github.com/microsoft/PowerToys/pull/38052">contribute</a> and
                            <a href="https://github.com/pydantic/bump-pydantic/pull/92">give back</a> to helpful projects.
                        </li>
                        <li>
                            🔧 I mostly build with Python, JavaScript/TypeScript, HTML & CSS, Svelte, Rust, and Embedded
                            C, with some Go on the side.
                        </li>
                    </ul>
                    <h2 class="font-normal">What I'm doing now</h2>
                    <p>These days I'm&hellip;</p>
                    <ul>
                        <li>
                            Head of the Embedded Systems department at <a href="https://greenbear.berlin">greenBEAR</a>,
                            a Formula Student racing team. There I design and program ECUs, work on vehicle telemetry,
                            and do a lot of other exciting things!
                        </li>
                        <li>
                            Using <code>.arpa</code> domains for
                            <a href="https://arpamail.lemonyte.com">email address masking</a>.
                        </li>
                        <li>Reviving my bass guitar skills with an old (but solid!) Ibanez GSR200 PJ.</li>
                        <li>
                            Trying to adapt to a <a href="https://polysleep.org/wiki/E2">polyphasic</a> sleep schedule.
                        </li>
                        <li>Working through my ever-growing backlog of personal projects and future blog posts.</li>
                    </ul>
                    <h2 class="font-normal">What I did before</h2>
                    <p>In the past I&hellip;</p>
                    <ul>
                        <li>
                            Developed the backend for an innovative social media app with a team of fellow students.
                        </li>
                        <li>
                            Organized retro LAN parties as part of the <a href="https://origolan.de">OrigoLAN</a> initiative.
                        </li>
                        <li>
                            Contributed to <a href="https://contiguity.com/">Contiguity</a>'s
                            <a href="https://github.com/contiguity/python">Python SDK</a>.
                        </li>
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
                {#each repos as repo (repo.url)}
                    <Card
                        title={repo.name}
                        href={repo.homepageUrl || repo.url}
                        description={repo.description ?? ""}
                        titleTags={repo.primaryLanguage ? [repo.primaryLanguage.name] : []}
                    />
                {/each}
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
