<script lang="ts">
    interface Props {
        url: string;
        icon_url: string;
        alt?: string;
        animateHover?: boolean;
        color?: boolean;
    }

    let { url, icon_url, alt = "", animateHover = true, color = false }: Props = $props();
</script>

<a href={url} target="_blank" rel="nofollow" class="w-9 h-9 rounded-md select-none">
    <img
        src={icon_url}
        {alt}
        class={[
            "shrink-0 transition",
            animateHover && (color ? "saturate-0 hover:saturate-100" : "opacity-50 hover:opacity-100"),
        ]}
    />
</a>
