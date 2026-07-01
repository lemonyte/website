import { response } from "super-sitemap/sveltekit";
import { baseUrl } from "$lib/config";

export const GET = async () => {
    return await response({ origin: baseUrl.toString().replace(/\/+$/, "") });
};
