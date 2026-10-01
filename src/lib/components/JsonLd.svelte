<script lang="ts">
    interface Props {
        data: Record<string, unknown>;
    }

    const { data }: Props = $props();

    const json = $derived(JSON.stringify({ "@context": "https://schema.org", ...data }).replaceAll("<", "\\u003c"));
</script>

<svelte:head>
    {@html `<script type="application/ld+json">${json}</script>`}
</svelte:head>
