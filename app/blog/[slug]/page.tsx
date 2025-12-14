import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TableOfContents } from "@/components/table-of-contents";
import { getBlogPostByType, getAllBlogPostsByType, getBlogSlugsByType, type BlogType } from "@/lib/mdx";

// Generate static params for all blog posts from both types
export async function generateStaticParams() {
    const engineeringSlugs = getBlogSlugsByType("engineering").map((slug) => ({
        slug,
    }));
    const techSlugs = getBlogSlugsByType("tech").map((slug) => ({
        slug,
    }));
    return [...engineeringSlugs, ...techSlugs];
}

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
    searchParams: Promise<{
        type?: string;
    }>;
}

export default async function BlogPostPage({ params, searchParams }: BlogPostPageProps) {
    const { slug } = await params;
    const { type } = await searchParams;

    // Determine blog type from URL param, default to trying engineering first
    let blogType: BlogType = type === "tech" ? "tech" : "engineering";
    let post = await getBlogPostByType(slug, blogType);

    // If not found in specified type, try the other type
    if (!post) {
        const alternateType: BlogType = blogType === "engineering" ? "tech" : "engineering";
        post = await getBlogPostByType(slug, alternateType);
        if (post) {
            blogType = alternateType;
        }
    }

    if (!post) {
        notFound();
    }

    const allPosts = getAllBlogPostsByType(blogType);
    const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

    const backUrl = `/blog?type=${blogType}`;

    return (
        <>
            <Header />
            <main className="min-h-screen pt-24 pb-20">
                <div className="container mx-auto px-6">
                    <div className="flex gap-8">
                        {/* Main Content - 80% */}
                        <article className="w-full xl:w-[80%]">
                            {/* Back Button */}
                            <Button variant="ghost" asChild className="mb-8">
                                <Link href={backUrl}>
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to {blogType === "engineering" ? "Engineering" : "Tech"} Blog
                                </Link>
                            </Button>

                            {/* Header */}
                            <header className="mb-12">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {post.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                                    {post.title}
                                </h1>
                                <p className="mt-4 text-xl text-muted-foreground">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center gap-6 mt-6 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>
                                            {new Date(post.date).toLocaleDateString("en-US", {
                                                month: "long",
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
                            </header>

                            <Separator className="mb-12" />

                            {/* MDX Content */}
                            <div className="prose prose-neutral dark:prose-invert max-w-none">
                                {post.content}
                            </div>

                            {/* Share */}
                            <div className="mt-16 pt-8 border-t border-border">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-muted-foreground">Share:</span>
                                    <Button variant="ghost" size="icon" asChild>
                                        <a
                                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Twitter className="h-4 w-4" />
                                        </a>
                                    </Button>
                                    <Button variant="ghost" size="icon" asChild>
                                        <a
                                            href={`https://www.linkedin.com/sharing/share-offsite/`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Linkedin className="h-4 w-4" />
                                        </a>
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Related Posts */}
                            {relatedPosts.length > 0 && (
                                <div className="mt-16">
                                    <h3 className="text-lg font-semibold mb-6">More Posts</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {relatedPosts.map((relatedPost) => (
                                            <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}?type=${blogType}`}>
                                                <Card className="h-full hover:border-foreground/20 transition-colors cursor-pointer">
                                                    <CardContent className="pt-6">
                                                        <h4 className="font-medium">{relatedPost.title}</h4>
                                                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                                            {relatedPost.excerpt}
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </article>

                        {/* Table of Contents - Right Sidebar - 20% */}
                        <aside className="hidden xl:block w-[20%] shrink-0">
                            <div className="sticky top-28">
                                <TableOfContents headings={post.headings} />
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
