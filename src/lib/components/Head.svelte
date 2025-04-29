<script lang="ts">
    import { page } from "$app/state";
    import * as config from "$lib/config";
    import type { Snippet } from "svelte";

    interface Props {
        title?: string;
        description?: string;
        type?: string;
        url?: string;
        image?: string;
        siteName?: string;
        children?: Snippet;
    }

    const {
        title = config.siteName,
        description = config.description,
        type = "website",
        url = new URL(page.url.pathname, config.baseUrl).href,
        image,
        siteName = config.siteName,
        children,
    }: Props = $props();
</script>

<svelte:head>
    {#if title === config.siteName}
        <title>{title}</title>
    {:else}
        <title>{`${title} | ${config.siteName}`}</title>
    {/if}
    <link rel="canonical" href={url} />
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content={type} />
    <meta property="og:url" content={url} />
    {#if image}
        <meta property="og:image" content={image} />
    {/if}
    <meta property="og:site_name" content={siteName} />
    {#if children}
        {@render children()}
    {/if}
</svelte:head>
