"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionWrapper, SectionHeader } from "@/components/layout/section-wrapper";
import { experiences } from "@/data/experience";

const typeIcons = {
    fulltime: Briefcase,
    internship: GraduationCap,
    contract: Briefcase,
    freelance: Briefcase,
};

const typeLabels = {
    fulltime: "Full-time",
    internship: "Internship",
    contract: "Contract",
    freelance: "Freelance",
};

export function Experience() {
    return (
        <SectionWrapper id="experience">
            <SectionHeader
                title="Experience"
                subtitle="A timeline of my journey building products at startups. Focused on ownership, speed, and impact."
            />

            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

                <div className="space-y-12">
                    {experiences.map((exp, index) => {
                        const Icon = typeIcons[exp.type];
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`relative flex flex-col md:flex-row ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                                    } gap-8 md:gap-16`}
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 rounded-full bg-foreground border-4 border-background -translate-x-[5px] md:-translate-x-1.5" />

                                {/* Content */}
                                <div className={`flex-1 pl-8 md:pl-0 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                                    <div className={`inline-flex items-center gap-2 ${isEven ? "md:flex-row-reverse" : ""}`}>
                                        <Icon className="h-4 w-4 text-muted-foreground" />
                                        <Badge variant="outline" className="font-normal">
                                            {typeLabels[exp.type]}
                                        </Badge>
                                    </div>
                                    <div className="mt-2 text-sm text-muted-foreground">
                                        {exp.duration}
                                    </div>
                                </div>

                                {/* Details Card */}
                                <div className="flex-1 pl-8 md:pl-0">
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value={exp.id} className="border-none">
                                            <AccordionTrigger className="hover:no-underline py-0">
                                                <div className="text-left">
                                                    <h3 className="text-lg font-semibold">{exp.role}</h3>
                                                    <p className="text-muted-foreground">{exp.company}</p>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pt-4">
                                                <p className="text-muted-foreground mb-4">
                                                    {exp.description}
                                                </p>
                                                <div className="space-y-3">
                                                    <h4 className="text-sm font-medium">Key Achievements</h4>
                                                    <ul className="space-y-2">
                                                        {exp.achievements.map((achievement, i) => (
                                                            <li
                                                                key={i}
                                                                className="text-sm text-muted-foreground flex items-start gap-2"
                                                            >
                                                                <span className="text-foreground mt-1.5">•</span>
                                                                {achievement}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="flex flex-wrap gap-2 mt-4">
                                                    {exp.technologies.map((tech) => (
                                                        <Badge key={tech} variant="secondary" className="font-normal">
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </SectionWrapper>
    );
}
