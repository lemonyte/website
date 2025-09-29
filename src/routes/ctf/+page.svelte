<script lang="ts">
    import Card from "$lib/components/Card.svelte";
    import Island from "$lib/components/Island.svelte";
    import Head from "$lib/components/Head.svelte";
    import { challenges } from "$lib/challenges";
</script>

<Head title="CTF Challenges" description="Lemonyte's CTF Challenges" />

<Island>
    <h1 class="text-4xl font-semibold mb-4">Challenges</h1>

    <div>
        <div class="grid grid-cols-1 gap-2">
            {#each challenges as challenge}
                <Card
                    title={challenge.title}
                    href={`/ctf/${challenge.slug}`}
                    description={challenge.description}
                    tags={[challenge.language, challenge.difficulty]}
                />
            {/each}
        </div>
    </div>
</Island>
