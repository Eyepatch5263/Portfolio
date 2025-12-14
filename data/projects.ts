export interface Project {
    id: string;
    slug: string;
    title: string;
    tagline: string;
    problem: string;
    role: string;
    impact: string;
    technologies: string[];
    featured: boolean;
    thumbnail?: string;
}

export const projects: Project[] = [
    {
        id: "proj-1",
        slug: "realtime-payments-platform",
        title: "Real-time Payments Platform",
        tagline: "Processing 10K+ daily transactions with 99.99% uptime",
        problem:
            "Legacy payment system couldn't handle growing transaction volume, causing failed payments and revenue loss.",
        role: "Lead Engineer",
        impact: "Reduced payment failures by 95%, increased throughput by 10x",
        technologies: ["Node.js", "PostgreSQL", "Redis", "Kafka", "Kubernetes"],
        featured: true,
    },
    {
        id: "proj-2",
        slug: "collaborative-document-editor",
        title: "Collaborative Document Editor",
        tagline: "Real-time collaboration for 50K+ daily active users",
        problem:
            "Teams needed a fast, reliable way to collaborate on documents without conflicts or data loss.",
        role: "Full Stack Engineer",
        impact: "Enabled real-time editing with sub-100ms sync latency",
        technologies: ["React", "TypeScript", "Go", "MongoDB", "WebSockets"],
        featured: true,
    },
    {
        id: "proj-3",
        slug: "multi-tenant-saas-platform",
        title: "Multi-tenant SaaS Platform",
        tagline: "White-label solution serving 15+ enterprise clients",
        problem:
            "Clients needed customizable, isolated environments without the overhead of separate deployments.",
        role: "Architect & Lead Developer",
        impact: "Reduced client onboarding time from weeks to hours",
        technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Vercel"],
        featured: true,
    },
    {
        id: "proj-4",
        slug: "api-gateway-service",
        title: "API Gateway Service",
        tagline: "Unified entry point for 20+ microservices",
        problem:
            "Growing microservices architecture lacked centralized authentication, rate limiting, and monitoring.",
        role: "Backend Engineer",
        impact: "Centralized auth, reduced cross-service latency by 40%",
        technologies: ["Go", "Redis", "Prometheus", "Grafana", "Docker"],
        featured: false,
    },
    {
        id: "proj-5",
        slug: "developer-analytics-dashboard",
        title: "Developer Analytics Dashboard",
        tagline: "Insights into code quality and team velocity",
        problem:
            "Engineering teams lacked visibility into codebase health and deployment patterns.",
        role: "Full Stack Developer",
        impact: "Adopted by 5 teams, improved deployment frequency by 25%",
        technologies: ["React", "Python", "FastAPI", "TimescaleDB", "Docker"],
        featured: false,
    },
];
