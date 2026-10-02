<script lang="ts">
    import { challenges } from "#lib/challenges.ts";
    import ChallengeList from "#lib/components/ChallengeList.svelte";
    import Head from "#lib/components/Head.svelte";
    import Island from "#lib/components/Island.svelte";
    import JsonLd from "#lib/components/JsonLd.svelte";
    import * as config from "#lib/config.ts";

    const description = "Various custom-made security challenges to practice your cyber skills.";
</script>

<Head title="CTF Challenges" {description} />
<JsonLd
    data={{
        "@type": "CollectionPage",
        name: "CTF Challenges",
        description,
        url: new URL("/challenges", config.baseUrl).href,
        isPartOf: { "@id": config.websiteId },
        mainEntity: {
            "@type": "ItemList",
            itemListElement: challenges.map((challenge, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: challenge.title,
                url: new URL(`/challenges/${challenge.slug}`, config.baseUrl).href,
            })),
        },
    }}
/>

<Island>
    <h1 class="text-4xl font-semibold mb-4">CTF Challenges</h1>
    <ChallengeList {challenges} />
</Island>
