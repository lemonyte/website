<script lang="ts">
    import type { CTFChallenge } from "$lib/challenges";
    import Card from "$lib/components/Card.svelte";

    interface Props {
        challenges: CTFChallenge[];
        limit?: number;
    }

    const { challenges, limit }: Props = $props();
</script>

<div>
    <div class="grid grid-cols-1 gap-2">
        {#each limit ? challenges.slice(0, limit) : challenges as challenge}
            <Card
                title={challenge.title}
                href={`/challenges/${challenge.slug}`}
                description={challenge.description}
                bottomTags={[challenge.language, challenge.difficulty, ...challenge.tags]}
            />
        {/each}
    </div>
</div>
