<script lang="ts">
    import Head from "$lib/components/Head.svelte";
    import Island from "$lib/components/Island.svelte";
    import ChallengeList from "$lib/components/ChallengeList.svelte";
    import { challenges } from "$lib/challenges";
</script>

<Head title="CTF Challenges" description="Lemonyte's CTF Challenges" />

<Island>
    <h1 class="text-4xl font-semibold mb-4">Challenges</h1>
    <ChallengeList {challenges} />
</Island>
