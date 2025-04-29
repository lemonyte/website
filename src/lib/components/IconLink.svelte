<script lang="ts">
    interface Props {
        url: string;
        iconUrl: string;
        alt?: string;
        animateHover?: boolean;
        color?: boolean;
    }

    const { url, iconUrl, alt = "", animateHover = true, color = false }: Props = $props();
</script>

<a href={url} target="_blank" rel="nofollow" class="w-9 h-9 rounded-md select-none flex items-center">
    <img
        src={iconUrl}
        {alt}
        class={[
            "shrink-0 transition duration-75",
            animateHover && (color ? "saturate-0 hover:saturate-100" : "opacity-50 hover:opacity-100"),
        ]}
    />
</a>
