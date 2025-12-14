"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { User, Code } from "lucide-react";

interface ModeSwitchProps {
    mode: "recruiter" | "engineer";
    onModeChange: (mode: "recruiter" | "engineer") => void;
    className?: string;
}

export function ModeSwitch({ mode, onModeChange, className }: ModeSwitchProps) {
    return (
        <div className={cn("flex items-center gap-4", className)}>
            <span className="text-sm text-muted-foreground">View Mode:</span>
            <Tabs
                value={mode}
                onValueChange={(value) => onModeChange(value as "recruiter" | "engineer")}
            >
                <TabsList className="grid w-[240px] grid-cols-2">
                    <TabsTrigger value="recruiter" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Recruiter
                    </TabsTrigger>
                    <TabsTrigger value="engineer" className="flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        Engineer
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    );
}
