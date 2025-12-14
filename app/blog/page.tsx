import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getAllBlogPosts } from "@/lib/mdx";

export default function BlogPage() {
    const posts = getAllBlogPosts();

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
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold tracking-tight">
                            Engineering Blog
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                            Deep dives into system design, scaling challenges, and
                            architectural decisions. No fluff, just engineering.
                        </p>
                    </div>

                    {/* Blog Grid */}
                    <div className="space-y-4">
                        {posts.length === 0 ? (
                            <p className="text-muted-foreground">No blog posts yet.</p>
                        ) : (
                            posts.map((post) => (
                                <Link key={post.slug} href={`/blog/${post.slug}`}>
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
