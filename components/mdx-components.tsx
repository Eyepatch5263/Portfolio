import type { ComponentPropsWithoutRef } from "react";
import { Children, isValidElement } from "react";
import { cn } from "@/lib/utils";
import { Mermaid } from "@/components/mermaid";

// Language display names
const languageDisplay: Record<string, string> = {
    js: "JavaScript",
    javascript: "JavaScript",
    ts: "TypeScript",
    typescript: "TypeScript",
    tsx: "TypeScript (TSX)",
    jsx: "JavaScript (JSX)",
    python: "Python",
    py: "Python",
    bash: "Terminal",
    sh: "Terminal",
    shell: "Terminal",
    zsh: "Terminal",
    json: "JSON",
    yaml: "YAML",
    yml: "YAML",
    css: "CSS",
    html: "HTML",
    sql: "SQL",
    go: "Go",
    rust: "Rust",
    plaintext: "Plain Text",
    text: "Plain Text",
};

// Mac-style code block wrapper
function Pre({
    children,
    className,
    ...props
}: ComponentPropsWithoutRef<"pre">) {
    return (
        <pre
            className={cn("overflow-x-auto p-4 text-sm leading-relaxed", className)}
            {...props}
        >
            {children}
        </pre>
    );
}

// Helper to extract text content from React children
function extractTextContent(children: React.ReactNode): string {
    let text = "";
    Children.forEach(children, (child) => {
        if (typeof child === "string") {
            text += child;
        } else if (isValidElement(child)) {
            const props = child.props as { children?: React.ReactNode };
            if (props.children) {
                text += extractTextContent(props.children);
            }
        }
    });
    return text;
}

// Custom figure wrapper for rehype-pretty-code
function Figure({
    children,
    className,
    ...props
}: ComponentPropsWithoutRef<"figure">) {
    // Check if this is a code block (has data-rehype-pretty-code-figure)
    const isCodeBlock =
        props["data-rehype-pretty-code-figure" as keyof typeof props] !== undefined;

    // Extract language from data attribute
    const dataLanguage = props["data-language" as keyof typeof props] as string;

    // Check if this is a mermaid diagram
    if (dataLanguage === "mermaid") {
        const chartContent = extractTextContent(children);
        return <Mermaid chart={chartContent} />;
    }

    if (!isCodeBlock) {
        return (
            <figure className={className} {...props}>
                {children}
            </figure>
        );
    }

    // Use language for code block title
    let language = "Code";
    if (dataLanguage) {
        language = languageDisplay[dataLanguage] || dataLanguage.toUpperCase();
    }

    return (
        <figure
            className={cn(
                "my-6 rounded-xl border overflow-hidden shadow-lg",
                "bg-[#f6f8fa] border-[#d0d7de] dark:bg-[#0d1117] dark:border-[#30363d]",
                className
            )}
            {...props}
        >
            {/* Mac-style title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b bg-[#f0f3f6] border-[#d0d7de] dark:bg-[#161b22] dark:border-[#30363d]">
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 text-center">
                    <span className="text-xs font-medium text-[#57606a] dark:text-[#8b949e]">{language}</span>
                </div>
                <div className="w-13" />
            </div>
            {/* Code content */}
            <div className="[&_pre]:!m-0 [&_pre]:!rounded-none [&_pre]:!border-0 [&_pre]:p-4 [&_pre]:!bg-transparent [&_code]:!bg-transparent text-[#0a0a0a] dark:text-[#e6edf3]">
                {children}
            </div>
        </figure>
    );
}

function Code({
    children,
    className,
    ...props
}: ComponentPropsWithoutRef<"code">) {
    // Check if this is an inline code (no language class)
    const isInline = !className?.includes("language-");

    if (isInline) {
        return (
            <code
                className={cn(
                    "relative rounded-md bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm font-medium text-foreground",
                    className
                )}
                {...props}
            >
                {children}
            </code>
        );
    }

    return (
        <code className={cn("font-mono text-sm", className)} {...props}>
            {children}
        </code>
    );
}

// Custom image component with styling
function Img({
    src,
    alt,
    ...props
}: ComponentPropsWithoutRef<"img">) {
    return (
        <span className="block my-6">
            <img
                src={src}
                alt={alt || ""}
                className="rounded-lg border border-border shadow-md max-w-full h-auto"
                loading="lazy"
                {...props}
            />
            {alt && (
                <span className="block text-center text-sm text-muted-foreground mt-2">
                    {alt}
                </span>
            )}
        </span>
    );
}

// Table components
function Table({ className, ...props }: ComponentPropsWithoutRef<"table">) {
    return (
        <div className="my-6 w-full overflow-x-auto">
            <table
                className={cn(
                    "w-full border-collapse text-sm",
                    className
                )}
                {...props}
            />
        </div>
    );
}

function Thead({ className, ...props }: ComponentPropsWithoutRef<"thead">) {
    return (
        <thead
            className={cn("bg-muted/50", className)}
            {...props}
        />
    );
}

function Tbody({ className, ...props }: ComponentPropsWithoutRef<"tbody">) {
    return <tbody className={cn("", className)} {...props} />;
}

function Tr({ className, ...props }: ComponentPropsWithoutRef<"tr">) {
    return (
        <tr
            className={cn("border-b border-border", className)}
            {...props}
        />
    );
}

function Th({ className, ...props }: ComponentPropsWithoutRef<"th">) {
    return (
        <th
            className={cn(
                "px-4 py-3 text-left font-semibold text-foreground border border-border",
                className
            )}
            {...props}
        />
    );
}

function Td({ className, ...props }: ComponentPropsWithoutRef<"td">) {
    return (
        <td
            className={cn(
                "px-4 py-3 text-muted-foreground border border-border",
                className
            )}
            {...props}
        />
    );
}

// Heading components with anchor links
function H1({ className, children, ...props }: ComponentPropsWithoutRef<"h1">) {
    return (
        <h1
            className={cn(
                "scroll-mt-24 text-4xl font-bold tracking-tight mt-8 mb-4",
                className
            )}
            {...props}
        >
            {children}
        </h1>
    );
}

function H2({ className, children, id, ...props }: ComponentPropsWithoutRef<"h2">) {
    return (
        <h2
            id={id}
            className={cn(
                "scroll-mt-24 text-2xl font-bold tracking-tight mt-10 mb-4 group",
                className
            )}
            {...props}
        >
            {children}
            {id && (
                <a href={`#${id}`} className="ml-2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-opacity">
                    #
                </a>
            )}
        </h2>
    );
}

function H3({ className, children, id, ...props }: ComponentPropsWithoutRef<"h3">) {
    return (
        <h3
            id={id}
            className={cn(
                "scroll-mt-24 text-xl font-semibold tracking-tight mt-8 mb-3 group",
                className
            )}
            {...props}
        >
            {children}
            {id && (
                <a href={`#${id}`} className="ml-2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-opacity">
                    #
                </a>
            )}
        </h3>
    );
}

function P({ className, ...props }: ComponentPropsWithoutRef<"p">) {
    return (
        <p
            className={cn("leading-7 [&:not(:first-child)]:mt-4 text-muted-foreground text-base lg:text-xl", className)}
            {...props}
        />
    );
}

function Ul({ className, ...props }: ComponentPropsWithoutRef<"ul">) {
    return (
        <ul
            className={cn("my-4 ml-6 list-disc [&>li]:mt-2 text-muted-foreground", className)}
            {...props}
        />
    );
}

function Ol({ className, ...props }: ComponentPropsWithoutRef<"ol">) {
    return (
        <ol
            className={cn("my-4 ml-6 list-decimal [&>li]:mt-2 text-muted-foreground", className)}
            {...props}
        />
    );
}

function Blockquote({ className, ...props }: ComponentPropsWithoutRef<"blockquote">) {
    return (
        <blockquote
            className={cn(
                "mt-6 border-l-4 border-primary pl-6 italic text-muted-foreground",
                className
            )}
            {...props}
        />
    );
}

function Hr({ className, ...props }: ComponentPropsWithoutRef<"hr">) {
    return <hr className={cn("my-8 border-border", className)} {...props} />;
}

function A({ className, ...props }: ComponentPropsWithoutRef<"a">) {
    return (
        <a
            className={cn(
                "font-medium text-foreground hover:text-primary transition-colors",
                className
            )}
            {...props}
        />
    );
}

// Export all MDX components
export const mdxComponents = {
    pre: Pre,
    code: Code,
    figure: Figure,
    img: Img,
    table: Table,
    thead: Thead,
    tbody: Tbody,
    tr: Tr,
    th: Th,
    td: Td,
    h1: H1,
    h2: H2,
    h3: H3,
    p: P,
    ul: Ul,
    ol: Ol,
    blockquote: Blockquote,
    hr: Hr,
    a: A,
    Mermaid: Mermaid,
};
