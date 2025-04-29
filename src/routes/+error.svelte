<script lang="ts">
    import Island from "$lib/components/Island.svelte";
    import { page } from "$app/state";
</script>

<div class="my-auto">
    <Island>
        <div class="flex flex-col items-center justify-center h-[50vh]">
            <div class="flex flex-col gap-4">
                <h1 class="flex flex-col">
                    <span class="text-9xl font-semibold">{page.status}</span>
                    <span class="text-2xl">{page.error?.message}</span>
                </h1>
                <a href="/" class="text-sky-500 hover:underline">&larr; Go back home</a>
            </div>
        </div>
    </Island>
</div>
