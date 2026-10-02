import { browser } from "$app/env";
import { MediaQuery } from "svelte/reactivity";

const STORAGE_KEY = "bg-motion";

const reducedMotion = new MediaQuery("(prefers-reduced-motion: reduce)");

const readOverride = () => {
    if (!browser) {
        return undefined;
    }
    try {
        const value = localStorage.getItem(STORAGE_KEY);
        return value === null ? undefined : value === "on";
    } catch {
        return undefined;
    }
};

let override: boolean | undefined = $state(readOverride());

export const motion = {
    get enabled() {
        return override ?? !reducedMotion.current;
    },
    toggle() {
        override = !this.enabled;
        try {
            localStorage.setItem(STORAGE_KEY, override ? "on" : "off");
        } catch {
            // Storage can be unavailable (e.g. private browsing), in which case the choice lasts until reload.
        }
    },
};
