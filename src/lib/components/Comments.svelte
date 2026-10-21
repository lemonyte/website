<script lang="ts">
    import Giscus from "@giscus/svelte";
    import { MediaQuery } from "svelte/reactivity";

    const dark = new MediaQuery("(prefers-color-scheme: dark)");
</script>

<Giscus
    id="comments"
    repo="lemonyte/website"
    repoId="R_kgDOKC4xmg"
    category="Giscus comments"
    categoryId="DIC_kwDOKC4xms4CqA6y"
    mapping="pathname"
    term=""
    strict="1"
    reactionsEnabled="1"
    inputPosition="top"
    theme={dark.current ? "transparent_dark" : "transparent_light"}
    lang="en"
    loading="lazy"
/>
