<script lang="ts">
    interface Props {
        url: string;
        iconUrl: string;
        alt?: string;
        animateHover?: boolean;
        animateMode?: "opacity" | "saturation" | "monochrome-opacity";
        followColorScheme?: boolean;
        width?: string;
        height?: string;
    }

    const {
        url,
        iconUrl,
        alt = "",
        animateHover = true,
        animateMode = "opacity",
        followColorScheme = false,
        width = "36px",
        height = "36px",
    }: Props = $props();
</script>

<a href={url} target="_blank" rel="nofollow" class="select-none flex items-center" style:width style:height>
    <img
        src={iconUrl}
        {alt}
        class={[
            "shrink-0 transition duration-75",
            animateHover &&
                (animateMode === "saturation" ? "saturate-0 hover:saturate-100" : "opacity-50 hover:opacity-100"),
            animateHover && animateMode === "monochrome-opacity" && "filter-monochrome",
            followColorScheme && "fix-safari-monochrome-svg",
        ]}
        {width}
        {height}
    />
</a>
