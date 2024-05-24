<script lang="ts">
    export let url: string;
    export let icon_url: string;
    export let alt = "";
    export let animateHover = true;
    export let color = false;
</script>

<a href={url} target="_blank" rel="nofollow" class="w-9 h-9 rounded-md select-none">
    <img
        src={icon_url}
        {alt}
        class="flex-shrink-0 transition ease-in duration-100 {animateHover
            ? color
                ? 'saturate-0 hover:saturate-100'
                : 'opacity-50 hover:opacity-100'
            : ''}"
    />
</a>
