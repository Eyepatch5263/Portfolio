"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionWrapper, SectionHeader } from "@/components/layout/section-wrapper";
import { testimonials } from "@/data/testimonials";

const contextLabels = {
    colleague: "Colleague",
    manager: "Manager",
    client: "Client",
    mentor: "Mentor",
};

export function Testimonials() {
    return (
        <SectionWrapper id="testimonials" className="bg-secondary/30">
            <SectionHeader
                title="Testimonials"
                subtitle="What colleagues, managers, and clients say about working with me."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        key={testimonial.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Card className="h-full">
                            <CardContent className="pt-6">
                                <Quote className="h-8 w-8 text-muted-foreground/30 mb-4" />
                                <blockquote className="text-foreground leading-relaxed">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </blockquote>
                                <div className="mt-6 flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                                        <span className="text-sm font-medium">
                                            {testimonial.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="font-medium">{testimonial.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {testimonial.role} at {testimonial.company}
                                        </div>
                                    </div>
                                    <div className="ml-auto">
                                        <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-secondary">
                                            {contextLabels[testimonial.context]}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    );
}
