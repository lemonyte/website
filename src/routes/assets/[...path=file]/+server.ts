import { env } from "cloudflare:workers";

export const GET = async ({ params, request }) => {
    const obj = await env.MEDIA.get(params.path, { onlyIf: request.headers });
    if (obj === null) {
        return new Response("Not Found", { status: 404 });
    }
    const headers = new Headers();
    obj.writeHttpMetadata(headers);
    if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/octet-stream");
    }
    headers.set("ETag", obj.httpEtag);
    headers.set("Cache-Control", "max-age=604800");
    // R2 omits the body when the request's conditional headers show the client's copy is still current.
    if (!("body" in obj)) {
        return new Response(null, { status: 304, headers });
    }
    return new Response(obj.body, { headers });
};
