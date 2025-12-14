import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlogTypeTabs, type BlogType } from "@/components/ui/blog-type-tabs";
import { getAllBlogPostsByType } from "@/lib/mdx";

interface BlogPageProps {
    searchParams: Promise<{ type?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const params = await searchParams;
    const blogType: BlogType = params.type === "tech" ? "tech" : "engineering";
    const posts = getAllBlogPostsByType(blogType);

    const pageConfig = {
        engineering: {
            title: "Engineering Blog",
            description:
                "Deep dives into system design, scaling challenges, and architectural decisions. No fluff, just engineering.",
        },
        tech: {
            title: "Tech Blog",
            description:
                "Exploring development tools, programming languages, and the latest in technology.",
        },
    };

    const config = pageConfig[blogType];

    return (
        <>
            <Header />
            <main className="min-h-screen pt-24 pb-20">
                <div className="container mx-auto px-6">
                    {/* Back Button */}
                    <Button variant="ghost" asChild className="mb-8">
                        <Link href="/#blogs">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold tracking-tight">
                            {config.title}
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                            {config.description}
                        </p>
                    </div>

                    {/* Blog Type Tabs */}
                    <BlogTypeTabs activeType={blogType} className="mb-10" />

                    {/* Blog Grid */}
                    <div className="space-y-4">
                        {posts.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground text-lg">
                                    No blog posts yet in this category.
                                </p>
                                <p className="text-muted-foreground text-sm mt-2">
                                    Check back soon for new content!
                                </p>
                            </div>
                        ) : (
                            posts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}?type=${blogType}`}
                                >
                                    <Card className="group transition-all my-5 duration-300 hover:border-foreground/20 cursor-pointer">
                                        <CardContent className="py-6">
                                            <div className="flex flex-col md:flex-row md:items-start gap-4">
                                                {/* Main content */}
                                                <div className="flex-1">
                                                    <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                                                        {post.title}
                                                    </h2>
                                                    <p className="mt-2 text-muted-foreground">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="flex flex-wrap gap-2 mt-4">
                                                        {post.tags.map((tag) => (
                                                            <Badge
                                                                key={tag}
                                                                variant="secondary"
                                                                className="font-normal"
                                                            >
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
                                                            {new Date(post.date).toLocaleDateString("en-US", {
                                                                month: "short",
                                                                day: "numeric",
                                                                year: "numeric",
                                                            })}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        <span>{post.readingTime}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
