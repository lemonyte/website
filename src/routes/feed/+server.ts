import * as config from "$lib/config";
import { posts } from "$lib/posts";

export const prerender = true;

export const GET = async () => {
    const xml = `
        <?xml version="1.0" encoding="UTF-8"?>
        <feed xmlns="http://www.w3.org/2005/Atom">
            <title type="text">Lemonyte's Blog</title>
            <link href="${new URL("feed", config.baseUrl)}" rel="self" type="application/atom+xml" />
            <id>${new URL("feed", config.baseUrl)}</id>
            <updated>${new Date().toISOString()}</updated>
            ${posts
                .map(
                    (post) => `
                    <entry>
                        <title type="text">${post.title}</title>
                        <link href="${new URL(`/blog/${post.slug}`, config.baseUrl)}" />
                        <id>${new URL(`/blog/${post.slug}`, config.baseUrl)}</id>
                        <published>${post.date.toISOString()}</published>
                        <updated>${(post.updated ?? post.date).toISOString()}</updated>
                        <summary type="text">${post.description}</summary>
                        ${post.authors
                            .map(
                                (author) => `
                                <author>
                                    <name>${author.name}</name>
                                    ${author.email ? `<email>${author.email}</email>` : ""}
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
}
