import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ProjectPageClient } from "./client-page";

interface ProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return projects.map((p) => ({
        slug: p.slug,
    }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) {
        notFound();
    }

    return <ProjectPageClient slug={slug} />;
}
