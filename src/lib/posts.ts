interface PostMetadata {
    title: string;
    description: string;
    date: string;
    updated?: string;
    tags: string[];
    published: boolean;
}

export interface Post extends Omit<PostMetadata, "date" | "updated"> {
    date: Date;
    updated?: Date;
    slug: string;
}

export const posts: Post[] = Object.entries(import.meta.glob("/src/routes/blog/**/*.svx", { eager: true }))
    .map(([path, file]) => {
        const slug = path.split("/").at(-2);
        if (slug && file && typeof file === "object" && "metadata" in file) {
            const metadata = file.metadata as PostMetadata;
            const date = new Date(metadata.date);
            const updated = metadata.updated ? new Date(metadata.updated) : undefined;
            const post = { ...metadata, date, updated, slug };
            return post.published ? post : null;
        }
        return null;
    })
    .filter((post) => post !== null)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
