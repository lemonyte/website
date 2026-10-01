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
        imageAlt?: string;
        siteName?: string;
        noindex?: boolean;
        children?: Snippet;
    }

    const {
        title,
        description = config.description,
        type = "website",
        url = new URL(page.url.pathname, config.baseUrl).href,
        image,
        imageAlt,
        siteName = config.siteName,
        noindex = false,
        children,
    }: Props = $props();
</script>

<svelte:head>
    {#if title}
        <title>{`${title} | ${siteName}`}</title>
    {:else}
        <title>{`${siteName} – ${config.tagline}`}</title>
    {/if}
    {#if noindex}
        <meta name="robots" content="noindex" />
    {:else}
        <link rel="canonical" href={url} />
    {/if}
    <link href="/feed.xml" type="application/atom+xml" rel="alternate" title="Atom feed" />
    <meta name="description" content={description} />
    <meta property="og:title" content={title ?? siteName} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content={type} />
    {#if !noindex}
        <meta property="og:url" content={url} />
    {/if}
    {#if image}
        <meta property="og:image" content={new URL(image, config.baseUrl).href} />
        {#if imageAlt}
            <meta property="og:image:alt" content={imageAlt} />
        {/if}
    {/if}
    <meta property="og:site_name" content={siteName} />
    <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
    {#if children}
        {@render children()}
    {/if}
</svelte:head>
