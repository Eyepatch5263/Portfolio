"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
    id: string;
    children: React.ReactNode;
    className?: string;
    fullWidth?: boolean;
}

export function SectionWrapper({
    id,
    children,
    className,
    fullWidth = false,
}: SectionWrapperProps) {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
                "py-20 md:py-28",
                !fullWidth && "container mx-auto px-6",
                className
            )}
        >
            {children}
        </motion.section>
    );
}

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
    return (
        <div className={cn("mb-12 md:mb-16", className)}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
            {subtitle && (
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl">{subtitle}</p>
            )}
        </div>
    );
}
