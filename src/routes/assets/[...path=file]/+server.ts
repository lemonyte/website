import { env } from "cloudflare:workers";

export const GET = async ({ params }) => {
    const obj = await env.MEDIA.get(params.path);
    if (obj === null) {
        return new Response("Not Found", { status: 404 });
    }
    return new Response(obj.body, {
        headers: {
            "Content-Type": obj.httpMetadata?.contentType || "image/jpeg",
            "Cache-Control": "max-age=604800",
        },
    });
};
