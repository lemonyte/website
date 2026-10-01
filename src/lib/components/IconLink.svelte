<script lang="ts">
    interface Props {
        url: string;
        iconUrl: string;
        alt?: string;
        animateHover?: boolean;
        animateMode?: "opacity" | "saturation";
        monochrome?: boolean;
        rel?: string;
        width?: number;
        height?: number;
    }

    const {
        url,
        iconUrl,
        alt = "",
        animateHover = true,
        animateMode = "opacity",
        monochrome = false,
        rel = "nofollow",
        width = 36,
        height = 36,
    }: Props = $props();
</script>

<a
    href={url}
    target="_blank"
    {rel}
    class="select-none flex items-center"
    style:width="{width}px"
    style:height="{height}px"
>
    <img
        src={iconUrl}
        {alt}
        class={[
            "shrink-0 transition duration-75",
            monochrome && "filter-monochrome",
            animateHover &&
                (animateMode === "saturation" ? "saturate-0 hover:saturate-100" : "opacity-50 hover:opacity-100"),
        ]}
        {width}
        {height}
    />
</a>
