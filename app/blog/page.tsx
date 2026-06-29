import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlogListClient } from "./blog-list-client";
import { getAllBlogPostsByType } from "@/lib/mdx";

export default async function BlogPage() {
    const engineeringPosts = getAllBlogPostsByType("engineering");
    const techPosts = getAllBlogPostsByType("tech");

    return (
        <>
            <Header />
            <main className="min-h-screen pt-24 pb-20">
                <Suspense fallback={
                    <div className="container mx-auto px-6 py-12 text-center text-muted-foreground animate-pulse">
                        Loading posts...
                    </div>
                }>
                    <BlogListClient 
                        engineeringPosts={engineeringPosts} 
                        techPosts={techPosts} 
                    />
                </Suspense>
            </main>
            <Footer />
        </>
    );
}
