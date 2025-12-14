"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Calendar, Cpu, Code2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionWrapper, SectionHeader } from "@/components/layout/section-wrapper";
import { cn } from "@/lib/utils";

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readingTime: string;
    tags: string[];
}

type BlogType = "engineering" | "tech";

interface BlogsProps {
    engineeringPosts: BlogPost[];
    techPosts: BlogPost[];
}

const blogConfig = {
    engineering: {
        title: "Engineering Blog",
        subtitle: "Deep dives into system design, scaling challenges, and architectural decisions.",
        icon: Cpu,
    },
    tech: {
        title: "Tech Blog",
        subtitle: "Development tools, programming languages, and technology trends.",
        icon: Code2,
    },
};

export function Blogs({ engineeringPosts, techPosts }: BlogsProps) {
    const [activeType, setActiveType] = useState<BlogType>("engineering");

    const posts = activeType === "engineering" ? engineeringPosts : techPosts;
    const displayPosts = posts.slice(0, 3);
    const config = blogConfig[activeType];

    return (
        <SectionWrapper id="blogs">
            <div className="flex flex-col gap-6 mb-12 md:mb-16">
                <div className="flex items-end justify-between">
                    <SectionHeader
                        title={config.title}
                        subtitle={config.subtitle}
                        className="mb-0"
                    />
                    <Button variant="ghost" className="hidden md:flex" asChild>
                        <Link href={`/blog?type=${activeType}`}>
                            View all posts
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                {/* Blog Type Toggle */}
                <div className="flex gap-2">
                    {(["engineering", "tech"] as BlogType[]).map((type) => {
                        const Icon = blogConfig[type].icon;
                        const isActive = activeType === type;

                        return (
                            <button
                                key={type}
                                onClick={() => setActiveType(type)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200",
                                    isActive
                                        ? "border-primary bg-primary/5 text-primary"
                                        : "border-border hover:border-foreground/20 text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                <span className="text-sm font-medium">
                                    {type === "engineering" ? "Engineering" : "Tech"}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeType}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                >
                    {displayPosts.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">No blog posts yet in this category.</p>
                            <p className="text-muted-foreground text-sm mt-1">Check back soon!</p>
                        </div>
                    ) : (
                        displayPosts.map((blog, index) => (
                            <motion.div
                                key={blog.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link href={`/blog/${blog.slug}?type=${activeType}`}>
                                    <Card className="group transition-all duration-300 hover:border-foreground/20 cursor-pointer">
                                        <CardContent className="py-6">
                                            <div className="flex flex-col md:flex-row md:items-start gap-4">
                                                {/* Main content */}
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                                                        {blog.title}
                                                    </h3>
                                                    <p className="mt-2 text-muted-foreground line-clamp-2">
                                                        {blog.excerpt}
                                                    </p>
                                                    <div className="flex flex-wrap gap-2 mt-4">
                                                        {blog.tags.map((tag) => (
                                                            <Badge key={tag} variant="secondary" className="font-normal">
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Meta */}
                                                <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-2 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>
                                                            {new Date(blog.date).toLocaleDateString("en-US", {
                                                                month: "short",
                                                                day: "numeric",
                                                                year: "numeric",
                                                            })}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        <span>{blog.readingTime}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </AnimatePresence>

            <div className="mt-8 text-center md:hidden">
                <Button variant="outline" asChild>
                    <Link href={`/blog?type=${activeType}`}>
                        View all posts
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </SectionWrapper>
    );
}
