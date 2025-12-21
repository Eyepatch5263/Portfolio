"use client";

import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ModeSwitch } from "@/components/projects/mode-switch";
import {
    ArchitectureDiagram,
    projectArchitecture,
} from "@/components/projects/architecture-diagram";
import { projects } from "@/data/projects";
import { projectDetails } from "@/data/projectDetails";

// Default details for projects without specific case study
const defaultDetails = {
    problemStatement: {
        what: "Identified a significant technical challenge that needed solving.",
        who: "Development teams and end users facing the issue.",
        why: "The problem was causing inefficiency and poor user experience.",
    },
    productThinking: {
        solution: "Designed and implemented a solution addressing the core problem.",
        alternatives: ["Alternative approach 1", "Alternative approach 2"],
        tradeoffs: ["Trade-off decision 1", "Trade-off decision 2"],
    },
    recruiterView: {
        summary: "Led the technical design and implementation of a key system component.",
        impact: ["Measurable impact 1", "Measurable impact 2"],
        outcome: "Successfully delivered the project with positive business outcomes.",
    },
    engineerView: {
        apiDesign: "// API design details would go here",
        dbSchema: "-- Database schema details would go here",
        scalingApproach: "Details on scaling approach.",
        bottlenecks: ["Identified bottleneck and mitigation"],
    },
    challenges: [
        {
            issue: "A significant challenge encountered during development.",
            lesson: "The lesson learned and how it improved the final solution.",
        },
    ],
    learnings: ["Key learning from the project"],
    nextSteps: ["Potential future improvement"],
};

interface ProjectPageParams {
    params: Promise<{
        slug: string;
    }>;
}

export default function ProjectPage({ params }: ProjectPageParams) {
    const resolvedParams = React.use(params);
    const [mode, setMode] = React.useState<"recruiter" | "engineer">("recruiter");

    const project = projects.find((p) => p.slug === resolvedParams.slug);
    console.log(resolvedParams.slug);

    if (!project) {
        notFound();
    }

    const details = projectDetails[project.slug] || defaultDetails;

    return (
        <>
            <Header />

            <main className="min-h-screen pt-24 pb-20">
                <div className="container mx-auto px-6">
                    {/* Back Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Button variant="ghost" asChild className="mb-8">
                            <Link href="/#projects">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Projects
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                    >
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" asChild>
                                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                                        <Github className="mr-2 h-4 w-4" />
                                        Code
                                    </a>
                                </Button>
                                <Button variant="ghost" size="sm" asChild>
                                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="mr-2 h-4 w-4" />
                                        Live Demo
                                    </a>
                                </Button>
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                            {project.title}
                        </h1>
                        <p className="mt-4 text-xl text-muted-foreground max-w-3xl">
                            {project.tagline}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-6">
                            {project.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary">
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                    </motion.div>

                    {/* Mode Switch */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-12"
                    >
                        <ModeSwitch mode={mode} onModeChange={setMode} />
                    </motion.div>

                    <div className="space-y-16">
                        {/* 1. Problem Statement */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h2 className="text-2xl font-bold mb-6">1. Problem Statement</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">What?</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-muted-foreground">
                                        {details.problemStatement.what}
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Who?</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-muted-foreground">
                                        {details.problemStatement.who}
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Why it mattered?</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-muted-foreground">
                                        {details.problemStatement.why}
                                    </CardContent>
                                </Card>
                            </div>
                        </motion.section>

                        <Separator />

                        {/* 2. Product Thinking */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold mb-6">2. Product Thinking</h2>
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">The Solution</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-muted-foreground">
                                        {details.productThinking.solution}
                                    </CardContent>
                                </Card>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">
                                                Alternatives Considered
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2">
                                                {details.productThinking.alternatives.map((alt, i) => (
                                                    <li
                                                        key={i}
                                                        className="text-muted-foreground flex items-start gap-2"
                                                    >
                                                        <span className="text-foreground">•</span>
                                                        {alt}
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Trade-offs Made</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2">
                                                {details.productThinking.tradeoffs.map((tradeoff, i) => (
                                                    <li
                                                        key={i}
                                                        className="text-muted-foreground flex items-start gap-2"
                                                    >
                                                        <span className="text-foreground">•</span>
                                                        {tradeoff}
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </motion.section>

                        <Separator />

                        {/* 3. System Architecture */}
                        {projectArchitecture[resolvedParams.slug] && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-2xl font-bold mb-6">3. System Architecture</h2>
                                <ArchitectureDiagram
                                    nodes={projectArchitecture[resolvedParams.slug].nodes}
                                    connections={projectArchitecture[resolvedParams.slug].connections}
                                />
                                <p className="mt-4 text-sm text-muted-foreground">
                                    Hover over components to see details. This diagram is interactive.
                                </p>
                            </motion.section>
                        )}

                        <Separator />

                        {/* 4. Mode-Specific Content */}
                        <motion.section
                            key={mode}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold mb-6">
                                4. {mode === "recruiter" ? "Impact & Outcome" : "Technical Deep Dive"}
                            </h2>

                            {mode === "recruiter" ? (
                                <div className="space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Summary</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-muted-foreground">
                                            {details.recruiterView.summary}
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Key Impact</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2">
                                                {details.recruiterView.impact.map((item, i) => (
                                                    <li
                                                        key={i}
                                                        className="text-muted-foreground flex items-start gap-2"
                                                    >
                                                        <span className="text-green-500">✓</span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Outcome</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-muted-foreground">
                                            {details.recruiterView.outcome}
                                        </CardContent>
                                    </Card>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">API Design</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <pre className="p-4 rounded-lg bg-secondary overflow-x-auto text-sm">
                                                <code>{details.engineerView.apiDesign}</code>
                                            </pre>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">{resolvedParams.slug == 'explain-bytes' ? "Schema Design" : "Database Schema"}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <pre className="p-4 rounded-lg bg-secondary overflow-x-auto text-sm">
                                                <code>{details.engineerView.dbSchema}</code>
                                            </pre>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Scaling Approach</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-muted-foreground">
                                            {details.engineerView.scalingApproach}
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">
                                                Bottlenecks & Mitigations
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2">
                                                {details.engineerView.bottlenecks.map((item, i) => (
                                                    <li
                                                        key={i}
                                                        className="text-muted-foreground flex items-start gap-2"
                                                    >
                                                        <span className="text-foreground">•</span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                        </motion.section>

                        <Separator />

                        {/* 5. Challenges & Failures */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold mb-6">5. Challenges & Failures</h2>
                            <div className="space-y-6">
                                {details.challenges.map((challenge, i) => (
                                    <Card key={i}>
                                        <CardContent className="pt-6">
                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="font-medium text-destructive mb-2">
                                                        What Broke
                                                    </h4>
                                                    <p className="text-muted-foreground">{challenge.issue}</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-green-500 mb-2">
                                                        Lesson Learned
                                                    </h4>
                                                    <p className="text-muted-foreground">{challenge.lesson}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </motion.section>

                        <Separator />

                        {/* 6. Outcome & Learnings */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold mb-6">6. Outcome & Learnings</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Key Learnings</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {details.learnings.map((learning, i) => (
                                                <li
                                                    key={i}
                                                    className="text-muted-foreground flex items-start gap-2"
                                                >
                                                    <span className="text-foreground">→</span>
                                                    {learning}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">What I&apos;d Improve Next</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {details.nextSteps.map((step, i) => (
                                                <li
                                                    key={i}
                                                    className="text-muted-foreground flex items-start gap-2"
                                                >
                                                    <span className="text-foreground">○</span>
                                                    {step}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </motion.section>
                    </div>


                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mt-20 pt-12 border-t border-border"
                    >
                        <h3 className="text-lg font-semibold mb-6">Other Projects</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {projects
                                .filter((p) => p.slug !== project.slug)
                                .slice(0, 3)
                                .map((p) => (
                                    <Link key={p.id} href={`/projects/${p.slug}`}>
                                        <Card className="h-full hover:border-foreground/20 transition-colors cursor-pointer">
                                            <CardContent className="pt-6">
                                                <h4 className="font-medium">{p.title}</h4>
                                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                                    {p.tagline}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                        </div>
                    </motion.div>


                </div>
            </main>
            <Footer />
        </>
    );
}
