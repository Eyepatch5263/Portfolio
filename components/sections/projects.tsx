"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionWrapper, SectionHeader } from "@/components/layout/section-wrapper";
import { projects } from "@/data/projects";

export function Projects() {
    const featuredProjects = projects.filter((p) => p.featured);
    const otherProjects = projects.filter((p) => !p.featured);

    return (
        <SectionWrapper id="projects" className="bg-secondary/30">
            <SectionHeader
                title="Projects"
                subtitle="Case studies of systems I've designed and products I've shipped. Click to explore the engineering details."
            />

            {/* Featured Projects */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featuredProjects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Link href={`/projects/${project.slug}`}>
                            <Card className="group h-full transition-all duration-300 hover:border-foreground/20 hover:shadow-lg cursor-pointer">
                                <CardHeader className="pb-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {project.role}
                                            </p>
                                        </div>
                                        <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-muted-foreground">{project.problem}</p>

                                    <div className="pt-2">
                                        <p className="text-sm font-medium text-foreground">
                                            Impact: {project.impact}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {project.technologies.slice(0, 5).map((tech) => (
                                            <Badge key={tech} variant="secondary" className="font-normal">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Other Projects */}
            {otherProjects.length > 0 && (
                <div className="mt-12">
                    <h3 className="text-lg font-semibold mb-6 text-muted-foreground">
                        More Projects
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {otherProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link href={`/projects/${project.slug}`}>
                                    <Card className="group h-full transition-all duration-300 hover:border-foreground/20 cursor-pointer">
                                        <CardContent className="pt-6">
                                            <div className="flex items-start justify-between">
                                                <h4 className="font-medium group-hover:text-primary transition-colors">
                                                    {project.title}
                                                </h4>
                                                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                                {project.tagline}
                                            </p>
                                            <div className="flex flex-wrap gap-1.5 mt-4">
                                                {project.technologies.slice(0, 3).map((tech) => (
                                                    <Badge
                                                        key={tech}
                                                        variant="outline"
                                                        className="text-xs font-normal"
                                                    >
                                                        {tech}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </SectionWrapper>
    );
}
