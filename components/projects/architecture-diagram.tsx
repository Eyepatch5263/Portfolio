"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ArchitectureNode {
    id: string;
    label: string;
    type: "frontend" | "backend" | "database" | "cache" | "queue" | "external";
    x: number;
    y: number;
    description?: string;
}

interface ArchitectureConnection {
    from: string;
    to: string;
    label?: string;
    animated?: boolean;
}

interface ArchitectureDiagramProps {
    nodes: ArchitectureNode[];
    connections: ArchitectureConnection[];
    className?: string;
}

const nodeStyles = {
    frontend: "bg-foreground text-background",
    backend: "bg-secondary text-foreground border-2 border-foreground",
    database: "bg-muted text-foreground border-2 border-muted-foreground",
    cache: "bg-secondary text-foreground border-2 border-dashed border-muted-foreground",
    queue: "bg-secondary text-foreground border-2 border-dashed border-foreground",
    external: "bg-background text-foreground border-2 border-muted-foreground",
};

const nodeLabels = {
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
    cache: "Cache",
    queue: "Queue",
    external: "External",
};

export function ArchitectureDiagram({
    nodes,
    connections,
    className,
}: ArchitectureDiagramProps) {
    const [hoveredNode, setHoveredNode] = React.useState<string | null>(null);

    return (
        <div className={cn("relative w-full h-[400px] overflow-hidden rounded-lg bg-card border border-border", className)}>
            {/* Grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]" />

            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                {/* Connections */}
                {connections.map((connection, index) => {
                    const fromNode = nodes.find((n) => n.id === connection.from);
                    const toNode = nodes.find((n) => n.id === connection.to);
                    if (!fromNode || !toNode) return null;

                    const isHighlighted =
                        hoveredNode === connection.from || hoveredNode === connection.to;

                    return (
                        <g key={index}>
                            <motion.line
                                x1={`${fromNode.x}%`}
                                y1={`${fromNode.y}%`}
                                x2={`${toNode.x}%`}
                                y2={`${toNode.y}%`}
                                stroke={isHighlighted ? "currentColor" : "hsl(var(--muted-foreground))"}
                                strokeWidth={isHighlighted ? 2 : 1}
                                strokeDasharray={connection.animated ? "5,5" : "none"}
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="text-foreground"
                            />
                            {connection.label && (
                                <text
                                    x={`${(fromNode.x + toNode.x) / 2}%`}
                                    y={`${(fromNode.y + toNode.y) / 2 - 2}%`}
                                    textAnchor="middle"
                                    className="text-[10px] fill-muted-foreground"
                                >
                                    {connection.label}
                                </text>
                            )}
                        </g>
                    );
                })}
            </svg>

            {/* Nodes */}
            {nodes.map((node, index) => (
                <motion.div
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        zIndex: hoveredNode === node.id ? 50 : 1
                    }}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                >
                    <div
                        className={cn(
                            "px-4 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer",
                            nodeStyles[node.type],
                            hoveredNode === node.id && "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                        )}
                    >
                        <div className="text-center">{node.label}</div>
                        <div className="text-[10px] opacity-70 text-center">
                            {nodeLabels[node.type]}
                        </div>
                    </div>

                    {/* Tooltip */}
                    {hoveredNode === node.id && node.description && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-popover text-popover-foreground rounded-md text-xs max-w-[200px] text-center shadow-lg border border-border z-10"
                        >
                            {node.description}
                        </motion.div>
                    )}
                </motion.div>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 right-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-foreground" />
                    <span>Frontend</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded border-2 border-foreground bg-secondary" />
                    <span>Backend</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded border-2 border-muted-foreground bg-muted" />
                    <span>Database</span>
                </div>
            </div>
        </div>
    );
}

// Default sample architecture
export const projectArchitecture: Record<string, { nodes: ArchitectureNode[]; connections: ArchitectureConnection[] }> = {
    "explain-bytes": {
        nodes: [
            { id: "client", label: "Next.js App", type: "frontend" as const, x: 15, y: 50, description: "Modern React frontend with SSR & ISR for sub-second documentation rendering." },
            { id: "api", label: "API Gateway", type: "backend" as const, x: 40, y: 50, description: "Node.js layer handling search logic, rate limiting, and content resolution." },
            { id: "redis", label: "Redis", type: "cache" as const, x: 65, y: 20, description: "Read-through cache serving hot search terms and frequently accessed metadata." },
            { id: "elasticsearch", label: "Elasticsearch", type: "database" as const, x: 65, y: 50, description: "Core search engine providing fast, relevant technical concept lookup across documentation." },
            { id: "fs", label: "Node FS", type: "database" as const, x: 85, y: 35, description: "Local file system serving as the source of truth for MDX documentation and flashcards via I/O operations." },
        ],
        connections: [
            { from: "client", to: "api", label: "HTTPS/JSON" },
            { from: "api", to: "redis", label: "Cache Lookup" },
            { from: "api", to: "elasticsearch", label: "Search Queries" },
            { from: "api", to: "fs", label: "File I/O", animated: true },
        ],
    },
    "codilio": {
        nodes: [
            { id: "client", label: "Next.js App", type: "frontend" as const, x: 15, y: 50, description: "Modern React frontend with SSR & ISR for sub-second documentation rendering." },
            { id: "api", label: "API Gateway", type: "backend" as const, x: 40, y: 50, description: "Node.js layer handling search logic, rate limiting, and content resolution." },
            { id: "redis", label: "Redis", type: "cache" as const, x: 65, y: 20, description: "Read-through cache serving hot search terms and frequently accessed metadata." },
            { id: "elasticsearch", label: "Elasticsearch", type: "database" as const, x: 65, y: 50, description: "Core search engine providing fast, relevant technical concept lookup across documentation." },
            { id: "fs", label: "Node FS", type: "database" as const, x: 85, y: 35, description: "Local file system serving as the source of truth for MDX documentation and flashcards via I/O operations." },
        ],
        connections: [
            { from: "client", to: "api", label: "HTTPS/JSON" },
            { from: "api", to: "redis", label: "Cache Lookup" },
            { from: "api", to: "elasticsearch", label: "Search Queries" },
            { from: "api", to: "fs", label: "File I/O", animated: true },
        ],
    },
    "onlyanime": {
        nodes: [
            { id: "client", label: "Next.js App", type: "frontend" as const, x: 15, y: 50, description: "Modern React frontend with SSR & ISR for sub-second documentation rendering." },
            { id: "api", label: "API Gateway", type: "backend" as const, x: 40, y: 50, description: "Node.js layer handling search logic, rate limiting, and content resolution." },
            { id: "redis", label: "Redis", type: "cache" as const, x: 65, y: 20, description: "Read-through cache serving hot search terms and frequently accessed metadata." },
            { id: "elasticsearch", label: "Elasticsearch", type: "database" as const, x: 65, y: 50, description: "Core search engine providing fast, relevant technical concept lookup across documentation." },
            { id: "fs", label: "Node FS", type: "database" as const, x: 85, y: 35, description: "Local file system serving as the source of truth for MDX documentation and flashcards via I/O operations." },
        ],
        connections: [
            { from: "client", to: "api", label: "HTTPS/JSON" },
            { from: "api", to: "redis", label: "Cache Lookup" },
            { from: "api", to: "elasticsearch", label: "Search Queries" },
            { from: "api", to: "fs", label: "File I/O", animated: true },
        ],
    },
    "spotify-chats": {
        nodes: [
            { id: "client", label: "Next.js App", type: "frontend" as const, x: 15, y: 50, description: "Modern React frontend with SSR & ISR for sub-second documentation rendering." },
            { id: "api", label: "API Gateway", type: "backend" as const, x: 40, y: 50, description: "Node.js layer handling search logic, rate limiting, and content resolution." },
            { id: "redis", label: "Redis", type: "cache" as const, x: 65, y: 20, description: "Read-through cache serving hot search terms and frequently accessed metadata." },
            { id: "elasticsearch", label: "Elasticsearch", type: "database" as const, x: 65, y: 50, description: "Core search engine providing fast, relevant technical concept lookup across documentation." },
            { id: "fs", label: "Node FS", type: "database" as const, x: 85, y: 35, description: "Local file system serving as the source of truth for MDX documentation and flashcards via I/O operations." },
        ],
        connections: [
            { from: "client", to: "api", label: "HTTPS/JSON" },
            { from: "api", to: "redis", label: "Cache Lookup" },
            { from: "api", to: "elasticsearch", label: "Search Queries" },
            { from: "api", to: "fs", label: "File I/O", animated: true },
        ],
    },
    "collage-generator": {
        nodes: [
            { id: "client", label: "Next.js App", type: "frontend" as const, x: 15, y: 50, description: "Modern React frontend with SSR & ISR for sub-second documentation rendering." },
            { id: "api", label: "API Gateway", type: "backend" as const, x: 40, y: 50, description: "Node.js layer handling search logic, rate limiting, and content resolution." },
            { id: "redis", label: "Redis", type: "cache" as const, x: 65, y: 20, description: "Read-through cache serving hot search terms and frequently accessed metadata." },
            { id: "elasticsearch", label: "Elasticsearch", type: "database" as const, x: 65, y: 50, description: "Core search engine providing fast, relevant technical concept lookup across documentation." },
            { id: "fs", label: "Node FS", type: "database" as const, x: 85, y: 35, description: "Local file system serving as the source of truth for MDX documentation and flashcards via I/O operations." },
        ],
        connections: [
            { from: "client", to: "api", label: "HTTPS/JSON" },
            { from: "api", to: "redis", label: "Cache Lookup" },
            { from: "api", to: "elasticsearch", label: "Search Queries" },
            { from: "api", to: "fs", label: "File I/O", animated: true },
        ],
    },
    "chat": {
        nodes: [
            { id: "client", label: "Next.js App", type: "frontend" as const, x: 15, y: 50, description: "Modern React frontend with SSR & ISR for sub-second documentation rendering." },
            { id: "api", label: "API Gateway", type: "backend" as const, x: 40, y: 50, description: "Node.js layer handling search logic, rate limiting, and content resolution." },
            { id: "redis", label: "Redis", type: "cache" as const, x: 65, y: 20, description: "Read-through cache serving hot search terms and frequently accessed metadata." },
            { id: "elasticsearch", label: "Elasticsearch", type: "database" as const, x: 65, y: 50, description: "Core search engine providing fast, relevant technical concept lookup across documentation." },
            { id: "fs", label: "Node FS", type: "database" as const, x: 85, y: 35, description: "Local file system serving as the source of truth for MDX documentation and flashcards via I/O operations." },
        ],
        connections: [
            { from: "client", to: "api", label: "HTTPS/JSON" },
            { from: "api", to: "redis", label: "Cache Lookup" },
            { from: "api", to: "elasticsearch", label: "Search Queries" },
            { from: "api", to: "fs", label: "File I/O", animated: true },
        ],
    },
    "feedback": {
        nodes: [
            { id: "client", label: "Next.js App", type: "frontend" as const, x: 15, y: 50, description: "Modern React frontend with SSR & ISR for sub-second documentation rendering." },
            { id: "api", label: "API Gateway", type: "backend" as const, x: 40, y: 50, description: "Node.js layer handling search logic, rate limiting, and content resolution." },
            { id: "redis", label: "Redis", type: "cache" as const, x: 65, y: 20, description: "Read-through cache serving hot search terms and frequently accessed metadata." },
            { id: "elasticsearch", label: "Elasticsearch", type: "database" as const, x: 65, y: 50, description: "Core search engine providing fast, relevant technical concept lookup across documentation." },
            { id: "fs", label: "Node FS", type: "database" as const, x: 85, y: 35, description: "Local file system serving as the source of truth for MDX documentation and flashcards via I/O operations." },
        ],
        connections: [
            { from: "client", to: "api", label: "HTTPS/JSON" },
            { from: "api", to: "redis", label: "Cache Lookup" },
            { from: "api", to: "elasticsearch", label: "Search Queries" },
            { from: "api", to: "fs", label: "File I/O", animated: true },
        ],
    }

};
