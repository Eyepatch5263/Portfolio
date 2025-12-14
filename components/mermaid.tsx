"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { cn } from "@/lib/utils";

interface MermaidProps {
    chart: string;
    className?: string;
}

export function Mermaid({ chart, className }: MermaidProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false,
            theme: "neutral",
            securityLevel: "loose",
            fontFamily: "inherit",
        });

        const renderChart = async () => {
            if (!containerRef.current) return;

            try {
                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                const { svg } = await mermaid.render(id, chart);
                setSvg(svg);
                setError(null);
            } catch (err) {
                console.error("Mermaid rendering error:", err);
                setError("Failed to render diagram");
            }
        };

        renderChart();
    }, [chart]);

    if (error) {
        return (
            <div className="my-6 p-4 rounded-lg border border-destructive/50 bg-destructive/10 text-destructive">
                {error}
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={cn(
                "my-6 flex justify-center overflow-x-auto rounded-xl border bg-muted/30 p-6",
                className
            )}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}
