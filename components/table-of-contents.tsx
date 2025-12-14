"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
    headings: { id: string; text: string; level: number }[];
    className?: string;
}

export function TableOfContents({ headings, className }: TableOfContentsProps) {
    const [activeId, setActiveId] = React.useState<string>("");

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-100px 0px -80% 0px" }
        );

        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            headings.forEach(({ id }) => {
                const element = document.getElementById(id);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [headings]);

    if (headings.length === 0) {
        return null;
    }

    return (
        <nav className={cn("space-y-1", className)}>
            <p className="font-medium text-sm md:text-xl text-foreground mb-4">On this page</p>
            <ul className="space-y-2 text-sm md:text-lg">
                {headings.map((heading, index) => (
                    <li
                        key={`${heading.id}-${index}`}
                        style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
                    >
                        <a
                            href={`#${heading.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                const element = document.getElementById(heading.id);
                                if (element) {
                                    element.scrollIntoView({ behavior: "smooth" });
                                    setActiveId(heading.id);
                                }
                            }}
                            className={cn(
                                "block py-1 text-muted-foreground hover:text-foreground transition-colors",
                                activeId === heading.id && "text-foreground font-medium"
                            )}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
