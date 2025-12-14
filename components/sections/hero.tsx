"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { stats } from "@/data/stats";

export function Hero() {
    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            id="overview"
            className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden"
        >
            {/* Subtle grid background - visible in both light and dark mode */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-size-[24px_24px]" />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background" />

            <div className="container relative mx-auto px-6 py-32 md:py-40">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Role Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-secondary text-secondary-foreground border border-border">
                            Software Engineer · DevOps Enthusiast · System Designer 
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-8 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                    >
                        I build{" "}
                        <span className="text-muted-foreground">scalable systems</span>
                        <br />
                        and{" "}
                        <span className="text-muted-foreground">beautiful products</span>
                    </motion.h1>

                    {/* Philosophy */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
                    >
                        With real users in mind. I think deeply about system design,
                        scalability, and trade-offs. Every line of code ships with purpose.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Button
                            size="lg"
                            className="group"
                            onClick={() => scrollToSection("#projects")}
                        >
                            View Projects
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => scrollToSection("#blogs")}
                        >
                            Read Blogs
                        </Button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                className="text-center p-6 rounded-lg bg-card border border-border"
                            >
                                <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                                <div className="mt-2 text-sm text-muted-foreground font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.button
                        onClick={() => scrollToSection("#projects")}
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Scroll to projects"
                    >
                        <ChevronDown className="h-6 w-6" />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
