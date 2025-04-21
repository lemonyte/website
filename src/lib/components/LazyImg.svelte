<script lang="ts">
    interface Props {
        src: string;
        alt?: string;
    }

    const { src, alt = "" }: Props = $props();
</script>

<img {src} {alt} loading="lazy" />
