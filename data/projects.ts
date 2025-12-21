export interface Project {
    id: string;
    slug: string;
    title: string;
    tagline: string;
    problem: string;
    impact: string;
    technologies: string[];
    featured: boolean;
    github?: string;
    demo?: string;
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
        github: "https://github.com/Eyepatch5263/dev-docs",
        demo: "https://docs.pratyush.works",
    },
    {
        id: "proj-2",
        slug: "collaborative-editor",
        title: "Collaborative Editor",
        tagline: "Collaborate on documents in real-time with others.",
        problem: "Maintaining data consistency in real-time collaborative environments is notoriously difficult due to race conditions and network lag. This project leverages CRDTs and Yjs to ensure a fluid, conflict-free editing experience with guaranteed eventual consistency.",
        impact: "Users can collaborate on documents in real-time with others.",
        technologies: ["React", "TypeScript", "Next.js", "yjs", "TipTap", "Prosemirror", "CRDT", "Tanstack-Query", "Shadcn UI", "Mdx", "Websockets", "Tailwind CSS", "Supabase"],
        featured: true,
        github: "https://github.com/Eyepatch5263/dev-docs",
        demo: "https://explainbytes.tech/collaborative-editor",
    },
    {
        id: "proj-3",
        slug: "codilio",
        title: "Codilio",
        tagline: "Code As You Go",
        problem:
            "Local environment setup for multiple programming languages is tedious and time-consuming, creating friction for students and developers who want to quickly experiment or solve problems.",
        impact: "Enabled zero-setup, instant multi-language code execution and snippet sharing, saving developers significantly on environment configuration time.",
        technologies: ["Next.js", "TypeScript", "Convex", "Clerk", "Piston API", "Lemon Squeezy", "Monaco Editor", "Tailwind CSS", "Zustand"],
        featured: true,
        github: "https://github.com/Eyepatch5263/codilio",
        demo: "https://codilio.pratyush.works"
    },
    {
        id: "proj-4",
        slug: "onlyanime",
        title: "OnlyAnime",
        tagline: "Platform for weebs to enjoy anime related contents.",
        problem:
            "As the anime industry is growing, it's becoming harder to find a platform to enjoy anime related contents.",
        impact: "OnlyAnime provides a platform for anime enthusiasts to enjoy anime related contents.",
        technologies: ["Next.js", "Node.js", "React.js", "PostgreSQL", "Prisma", "Kinde", "Shadcn UI", "Tailwind CSS", "Stripe", "Cloudinary", "Resend", "DaisyUI"],
        featured: true,
        github: "https://github.com/Eyepatch5263/Onlyanime",
        demo: "https://onlyanime.pratyush.works"
    },
    {
        id: "proj-5",
        slug: "spotify-chats",
        title: "Spotiy Chats",
        tagline: "Platform for users can listen to songs and chat with their friends.",
        problem:
            "People love seeing which songs their friends are listening to. Spotify Chats provides a platform for users to listen to songs and at same time can chat with their friends.",
        impact: "Friends can build a bond while chatting while also enjoying the music at same time.",
        technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Clerk", "Docker", "Tailwind CSS", "Websockets"],
        featured: true,
        github: "https://github.com/Eyepatch5263/spotify",
        demo: "https://spotify.pratyush.works"
    },
    {
        id: "proj-6",
        slug: "collage-generator",
        title: "Collage Generator",
        tagline: "Peeps can generate collages from images which they can use for their social media posts.",
        problem:
            "Many people needs a fast, reliable way to generate collages in instant.",
        impact: "Users can generate collages from images which they can use for their social media posts.",
        technologies: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "zustand"],
        featured: false,
        github: "https://github.com/Eyepatch5263/collage-generator",
        demo: "https://collage.pratyush.works"
    },
    {
        id: "proj-7",
        slug: "chat",
        title: "Chat",
        tagline: "Chat, call or video call with your friends all in realtime.",
        problem:
            "We all need a platform to where we can video/voice call our friends whithout worryhing about data privacy.",
        impact: "Users can trust that their data is safe and secure.",
        technologies: ["React.js", "Node.js", "Express.js", "Redis", "Socket.io", "Kinde Auth", "Cloudinary", "Tailwind CSS", "Websockets", "WebRTC"],
        featured: true,
        github: "https://github.com/Eyepatch5263/chat_app_redis",
        demo: "https://chat.pratyush.works"
    },
    {
        id: "proj-8",
        slug: "feedback",
        title: "Feedback",
        tagline: "Confess anonymously to your friends about your feelings.",
        problem:
            "Many people needs a fast, reliable way to confess anonymously to their friends.",
        impact: "Users can confess anonymously to their friends about their feelings.",
        technologies: ["React.js", "Node.js", "Gemini-API", "NextAuth.js", "Tailwind CSS", "Shadcn-UI"],
        featured: false,
        github: "https://github.com/Eyepatch5263/feedback",
        demo: "https://feedback.pratyush.works"
    },
    {
        id: "proj-9",
        slug: "blog-website",
        title: "Blog Website",
        tagline: "Write and share your thoughts with the world.",
        problem:
            "Many people needs a fast, reliable way to write and share their thoughts with the world.",
        impact: "Users can write and share their thoughts with the world.",
        technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Oauth", "Cloudinary", "editorjs", "firebase", "Jwt", "Multer", "Docker"],
        featured: false,
        github: "https://github.com/Eyepatch5263/Blogging",
        demo: "https://blog.pratyush.works"
    }
];
