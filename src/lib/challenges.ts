export interface CTFChallenge {
    title: string;
    description: string;
    slug: string;
    language: string;
    difficulty: "easy" | "medium" | "hard";
}

export const challenges: CTFChallenge[] = [
    {
        title: "Exec CTF",
        description: "Bypass the jail to execute code.",
        slug: "exec",
        language: "Python",
        difficulty: "medium",
    },
];
