<script lang="ts">
    interface Props {
        url: string;
        iconUrl: string;
        alt?: string;
        animateHover?: boolean;
        color?: boolean;
        width?: string;
        height?: string;
    }

    const {
        url,
        iconUrl,
        alt = "",
        animateHover = true,
        color = false,
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
            animateHover && (color ? "saturate-0 hover:saturate-100" : "opacity-50 hover:opacity-100"),
        ]}
        {width}
        {height}
    />
</a>
