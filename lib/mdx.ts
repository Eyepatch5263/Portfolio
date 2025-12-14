import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import readingTime from "reading-time";
import { mdxComponents } from "@/components/mdx-components";

const BLOG_DIR = path.join(process.cwd(), "content/blogs");

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    author?: string;
    tags: string[];
    readingTime: string;
    published: boolean;
}

export interface BlogPostWithContent extends BlogPost {
    content: React.ReactElement;
    headings: { id: string; text: string; level: number }[];
}

// Get all blog post slugs
export function getBlogSlugs(): string[] {
    if (!fs.existsSync(BLOG_DIR)) {
        return [];
    }
    return fs
        .readdirSync(BLOG_DIR)
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => file.replace(/\.mdx$/, ""));
}

// Get all blog posts metadata
export function getAllBlogPosts(): BlogPost[] {
    const slugs = getBlogSlugs();

    const posts = slugs
        .map((slug) => {
            const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
            const fileContent = fs.readFileSync(filePath, "utf-8");
            const { data, content } = matter(fileContent);
            const stats = readingTime(content);

            return {
                slug,
                title: data.title || slug,
                excerpt: data.excerpt || "",
                date: data.date || new Date().toISOString(),
                author: data.author,
                tags: data.tags || [],
                readingTime: stats.text,
                published: data.published !== false,
            };
        })
        .filter((post) => post.published)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
}

// Extract headings from MDX content for Table of Contents
function extractHeadings(content: string): { id: string; text: string; level: number }[] {
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const headings: { id: string; text: string; level: number }[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

        headings.push({ id, text, level });
    }

    return headings;
}

// Get a single blog post with content
export async function getBlogPost(slug: string): Promise<BlogPostWithContent | null> {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const stats = readingTime(content);
    const headings = extractHeadings(content);

    const { content: compiledContent } = await compileMDX({
        source: content,
        components: mdxComponents,
        options: {
            parseFrontmatter: false,
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                    [rehypePrettyCode, {
                        theme: "one-dark-pro",
                        keepBackground: true,
                        defaultLang: "typescript",
                    }],
                ],
            },
        },
    });

    return {
        slug,
        title: data.title || slug,
        excerpt: data.excerpt || "",
        date: data.date || new Date().toISOString(),
        author: data.author,
        tags: data.tags || [],
        readingTime: stats.text,
        published: data.published !== false,
        content: compiledContent,
        headings,
    };
}
