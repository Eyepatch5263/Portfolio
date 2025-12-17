export interface Project {
    id: string;
    slug: string;
    title: string;
    tagline: string;
    problem: string;
    impact: string;
    technologies: string[];
    featured: boolean;
    thumbnail?: string;
}

export const projects: Project[] = [
    {
        id: "proj-1",
        slug: "explain-bytes",
        title: "Explain Bytes",
        tagline: "Learn systems, fundamentals, and deep engineering concepts explained simply.",
        problem:
            "Many engineers struggle to understand complex systems and concepts. Explain Bytes provides clear, concise explanations to help developers learn and grow.",
        impact: "Contributing to the community by providing clear, concise explanations to help developers learn and grow.",
        technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Supabase", "NextAuth.js", "Redis", "yjs", "TipTap", "Tanstack-Query", "Shadcn UI", "Mdx", "Websockets", "Tailwind CSS", "Resend"],
        featured: true,
    },
    {
        id: "proj-2",
        slug: "codilio",
        title: "Codilio",
        tagline: "Code As You Go",
        problem:
            "Many people needs a fast, reliable platform to code as they go. Codilio provides a platform to code in real-time.",
        impact: "Users won't have to setup up libraries and packages to start coding.",
        technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Convex", "lemonSqueezy", "Docker", "Kubernetes", "DecSecOps", "Piston-API", "Zustand", "Monaco-Editor"],
        featured: true,
    },
    {
        id: "proj-3",
        slug: "onlyanime",
        title: "OnlyAnime",
        tagline: "Platform for weebs to enjoy anime related contents.",
        problem:
            "As the anime industry is growing, it's becoming harder to find a platform to enjoy anime related contents.",
        impact: "OnlyAnime provides a platform for anime enthusiasts to enjoy anime related contents.",
        technologies: ["Next.js", "Node.js", "React.js", "PostgreSQL", "Prisma", "Kinde", "Shadcn UI", "Tailwind CSS", "Stripe", "Cloudinary", "Resend", "DaisyUI"],
        featured: true,
    },
    {
        id: "proj-4",
        slug: "spotify-chats",
        title: "Spotiy Chats",
        tagline: "Platform for users can listen to songs and chat with their friends.",
        problem:
            "People love seeing which songs their friends are listening to. Spotify Chats provides a platform for users to listen to songs and at same time can chat with their friends.",
        impact: "Friends can build a bond while chatting while also enjoying the music at same time.",
        technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Clerk", "Docker", "Tailwind CSS", "Websockets"],
        featured: true,
    },
    {
        id: "proj-5",
        slug: "collage-generator",
        title: "Collage Generator",
        tagline: "Peeps can generate collages from images which they can use for their social media posts.",
        problem:
            "Many people needs a fast, reliable way to generate collages in instant.",
        impact: "Users can generate collages from images which they can use for their social media posts.",
        technologies: ["React.js","Next.js", "TypeScript", "MongoDB","Tailwind CSS", "zustand"],
        featured: false,
    },
    {
        id: "proj-6",
        slug: "blog-website",
        title: "Blog Website",
        tagline: "Write and share your thoughts with the world.",
        problem:
            "Many people needs a fast, reliable way to write and share their thoughts with the world.",
        impact: "Users can write and share their thoughts with the world.",
        technologies: ["React.js","Node.js","Express.js","MongoDB","Oauth","Cloudinary","editorjs","firebase","Jwt","Multer","Docker"],
        featured: false,
    },
    {
        id: "proj-7",
        slug: "EyeNGL",
        title: "EyeNGL",
        tagline: "Confess anonymously to your friends about your feelings.",
        problem:
            "Many people needs a fast, reliable way to confess anonymously to their friends.",
        impact: "Users can confess anonymously to their friends about their feelings.",
        technologies: ["React", "Python", "FastAPI", "TimescaleDB", "Docker"],
        featured: false,
    },
];
