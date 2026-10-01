import * as config from "$lib/config";
import { posts } from "$lib/posts";

export const prerender = true;

const escapeXml = (text: string) =>
    text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;");

export const GET = async () => {
    const lastUpdated = posts.reduce(
        (latest, post) => Math.max(latest, (post.updated ?? post.date).getTime()),
        posts.length ? 0 : Date.now(),
    );

    const xml = `
        <?xml version="1.0" encoding="UTF-8"?>
        <feed xmlns="http://www.w3.org/2005/Atom">
            <title type="text">Lemonyte's Blog</title>
            <link href="${new URL("feed.xml", config.baseUrl)}" rel="self" type="application/atom+xml" />
            <link href="${new URL("blog", config.baseUrl)}" rel="alternate" type="text/html" />
            <id>${new URL("feed.xml", config.baseUrl)}</id>
            <updated>${new Date(lastUpdated).toISOString()}</updated>
            ${posts
                .map(
                    (post) => `
                    <entry>
                        <title type="text">${escapeXml(post.title)}</title>
                        <link href="${new URL(`/blog/${post.slug}`, config.baseUrl)}" />
                        <id>${new URL(`/blog/${post.slug}`, config.baseUrl)}</id>
                        <published>${post.date.toISOString()}</published>
                        <updated>${(post.updated ?? post.date).toISOString()}</updated>
                        <summary type="text">${escapeXml(post.description)}</summary>
                        ${post.authors
                            .map(
                                (author) => `
                                <author>
                                    <name>${escapeXml(author.name)}</name>
                                    ${author.email ? `<email>${escapeXml(author.email)}</email>` : ""}
                                    ${author.url ? `<uri>${escapeXml(author.url)}</uri>` : ""}
                                </author>
                            `,
                            )
                            .join("")}
                    </entry>
                `,
                )
                .join("")}
        </feed>
    `.trim();

    return new Response(xml, {
        headers: {
            "Content-Type": "application/atom+xml",
        },
    });
};
