"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, ChevronUp, Github, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionWrapper, SectionHeader } from "@/components/layout/section-wrapper";
import { projects } from "@/data/projects";

export function Projects() {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const initialSlugs = ["explain-bytes", "collaborative-editor", "anima"];
    const initialProjects = projects.filter((p) => initialSlugs.includes(p.slug));
    const displayedProjects = isExpanded ? projects : initialProjects;

    return (
        <SectionWrapper id="projects">
            <SectionHeader
                title="Projects"
                subtitle="Case studies of systems I've designed and products I've shipped. Click to explore the engineering details."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProjects.map((project, index) => {
                    const isMinor = ["chat", "feedback", "collage-generator"].includes(project.slug);
                    
                    const cardContent = (
                        <Card className={`group h-full flex flex-col justify-between transition-all duration-300 hover:border-foreground/20 bg-card ${!isMinor ? "hover:shadow-lg cursor-pointer" : ""}`}>
                            <div>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className={`text-xl font-semibold transition-colors ${!isMinor ? "group-hover:text-primary" : ""}`}>
                                                {project.title}
                                            </h3>
                                            {isMinor && (
                                                <span className="inline-flex items-center mt-1.5 px-2 py-0.5 rounded text-[10px] font-medium bg-secondary text-secondary-foreground border border-border">
                                                    Minor Project
                                                </span>
                                            )}
                                        </div>
                                        {!isMinor && (
                                            <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-muted-foreground text-sm line-clamp-4">
                                        {project.problem}
                                    </p>
                                    <div className="pt-2">
                                        <p className="text-sm font-medium text-foreground line-clamp-2">
                                            Impact: {project.impact}
                                        </p>
                                    </div>
                                </CardContent>
                            </div>
                            <CardContent className="pt-0">
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {project.technologies.slice(0, 4).map((tech) => (
                                        <Badge key={tech} variant="secondary" className="font-normal text-xs">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                                {isMinor && (
                                    <div className="flex gap-3 pt-4 mt-2 border-t border-border/50 text-xs">
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-foreground font-medium transition-colors flex items-center gap-1"
                                            >
                                                <Github className="h-3.5 w-3.5" /> Code
                                            </a>
                                        )}
                                        {project.demo && (
                                            <a
                                                href={project.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-foreground font-medium transition-colors flex items-center gap-1"
                                            >
                                                <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                                            </a>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );

                    return (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="h-full"
                        >
                            {isMinor ? (
                                cardContent
                            ) : (
                                <Link href={`/projects/${project.slug}`} className="block h-full">
                                    {cardContent}
                                </Link>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            <div className="mt-12 flex justify-center">
                <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                        setIsExpanded(!isExpanded);
                        if (isExpanded) {
                            const element = document.getElementById("projects");
                            if (element) {
                                element.scrollIntoView({ behavior: "smooth" });
                            }
                        }
                    }}
                    className="gap-2 font-medium"
                >
                    {isExpanded ? (
                        <>
                            Show Less <ChevronUp className="h-4 w-4" />
                        </>
                    ) : (
                        <>
                            View More Projects <ChevronDown className="h-4 w-4" />
                        </>
                    )}
                </Button>
            </div>
        </SectionWrapper>
    );
}
