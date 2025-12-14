"use client";

import { motion } from "framer-motion";
import { Rocket, Zap, RefreshCw, Target, Code, Users } from "lucide-react";
import { SectionWrapper, SectionHeader } from "@/components/layout/section-wrapper";

const workPrinciples = [
    {
        icon: Code,
        title: "Design First",
        description: "I think through architecture before writing code. Good design saves debugging time.",
    },
    {
        icon: Zap,
        title: "Ship Fast",
        description: "Bias towards action. Get working software in front of users quickly.",
    },
    {
        icon: RefreshCw,
        title: "Iterate",
        description: "Feedback loops are everything. Build, measure, learn, repeat.",
    },
    {
        icon: Target,
        title: "Measure Impact",
        description: "If you can't measure it, you can't improve it. Data-driven decisions.",
    },
];

export function About() {
    return (
        <SectionWrapper id="about">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Left: Personal Story */}
                <div>
                    <SectionHeader title="About Me" className="mb-8" />

                    <div className="space-y-6 text-muted-foreground">
                        <p className="text-lg">
                            I&apos;m <span className="font-bold">Pratyush</span>, a software engineer who thrives in the chaos of early-stage startups.
                            There&apos;s something magical about building products from zero to one, wearing
                            multiple hats, and seeing your code directly impact real users.
                        </p>

                        <p>
                            My engineering philosophy is simple: <strong className="text-foreground">
                                write code that scales, ship products that matter, and always think about
                                the user.</strong> I believe the best engineers are product-minded—they
                            understand not just how to build, but what to build and why.
                        </p>

                        <p>
                            I love diving deep into system design challenges. How do you build a
                            payment system that never loses a transaction? How do you scale a
                            real-time collaboration feature to thousands of concurrent users? These
                            are the problems that excite me.
                        </p>

                        <div className="flex items-center gap-4 pt-4">
                            <div className="flex items-center gap-2">
                                <Rocket className="h-5 w-5 text-foreground" />
                                <span className="font-medium text-foreground">Startup-minded</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-foreground" />
                                <span className="font-medium text-foreground">Team player</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: How I Work */}
                <div>
                    <h3 className="text-xl font-semibold mb-8">How I Work</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {workPrinciples.map((principle, index) => (
                            <motion.div
                                key={principle.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="p-6 rounded-lg border border-border bg-card"
                            >
                                <principle.icon className="h-6 w-6 text-foreground mb-4" />
                                <h4 className="font-medium mb-2">{principle.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                    {principle.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Technical Interests */}
                    <div className="mt-8 p-6 rounded-lg border border-border bg-card">
                        <h4 className="font-medium mb-4">Currently Exploring</h4>
                        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                            <span className="px-3 py-1 rounded-full bg-secondary">Distributed Systems</span>
                            <span className="px-3 py-1 rounded-full bg-secondary">System Design</span>
                            <span className="px-3 py-1 rounded-full bg-secondary">Backend</span>
                            <span className="px-3 py-1 rounded-full bg-secondary">Open Source</span>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
