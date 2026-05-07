import { response } from "super-sitemap";
import { baseUrl } from "$lib/config";

export const GET = async () => {
    return await response({ origin: baseUrl.toString().replace(/\/+$/, "") });
};
