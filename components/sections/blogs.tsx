"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionWrapper, SectionHeader } from "@/components/layout/section-wrapper";

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readingTime: string;
    tags: string[];
}

interface BlogsProps {
    posts: BlogPost[];
}

export function Blogs({ posts }: BlogsProps) {
    const displayPosts = posts.slice(0, 3);

    return (
        <SectionWrapper id="blogs">
            <div className="flex items-end justify-between mb-12 md:mb-16">
                <SectionHeader
                    title="Engineering Blog"
                    subtitle="Deep dives into system design, scaling challenges, and architectural decisions."
                    className="mb-0"
                />
                <Button variant="ghost" className="hidden md:flex" asChild>
                    <Link href="/blog">
                        View all posts
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>

            <div className="space-y-4">
                {displayPosts.length === 0 ? (
                    <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
                ) : (
                    displayPosts.map((blog, index) => (
                        <motion.div
                            key={blog.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link href={`/blog/${blog.slug}`}>
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
            </div>

            <div className="mt-8 text-center md:hidden">
                <Button variant="outline" asChild>
                    <Link href="/blog">
                        View all posts
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </SectionWrapper>
    );
}
