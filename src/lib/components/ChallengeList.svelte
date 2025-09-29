<script lang="ts">
    import Card from "$lib/components/Card.svelte";
    import type { CTFChallenge } from "$lib/challenges";

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
                href={`/challenge/${challenge.slug}`}
                description={challenge.description}
                tags={[challenge.language, challenge.difficulty]}
            />
        {/each}
    </div>
</div>
