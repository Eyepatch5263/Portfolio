"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Cpu, Code2 } from "lucide-react";

export type BlogType = "engineering" | "tech";

interface BlogTypeTabsProps {
    activeType: BlogType;
    className?: string;
}

export function BlogTypeTabs({ activeType, className }: BlogTypeTabsProps) {
    const router = useRouter();
    const pathname = usePathname();

    const handleTypeChange = (type: BlogType) => {
        const params = new URLSearchParams();
        params.set("type", type);
        router.push(`${pathname}?${params.toString()}`);
    };

    const tabs = [
        {
            type: "engineering" as BlogType,
            label: "Engineering Blog",
            icon: Cpu,
            description: "System design & architecture",
        },
        {
            type: "tech" as BlogType,
            label: "Tech Blog",
            icon: Code2,
            description: "Development & tools",
        },
    ];

    return (
        <div className={cn("flex gap-4 p-1", className)}>
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeType === tab.type;

                return (
                    <button
                        key={tab.type}
                        onClick={() => handleTypeChange(tab.type)}
                        className={cn(
                            "flex-1 flex items-center gap-3 px-6 py-4 rounded-xl border-2 transition-all duration-300",
                            "hover:border-foreground/20 hover:bg-muted/50",
                            isActive
                                ? "border-primary bg-primary/5 shadow-sm"
                                : "border-border bg-background"
                        )}
                    >
                        <div
                            className={cn(
                                "p-2 rounded-lg transition-colors",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "bg-muted text-muted-foreground"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                            <div
                                className={cn(
                                    "font-semibold transition-colors",
                                    isActive ? "text-primary" : "text-foreground"
                                )}
                            >
                                {tab.label}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {tab.description}
                            </div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
