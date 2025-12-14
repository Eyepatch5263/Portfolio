export interface Stat {
    label: string;
    value: string;
    description?: string;
}

export const stats: Stat[] = [
    {
        label: "Projects Shipped",
        value: "15+",
        description: "Production applications built and deployed",
    },
    {
        label: "Systems Designed",
        value: "5+",
        description: "Scalable architectures from scratch",
    },
    {
        label: "Users Impacted",
        value: "500+",
        description: "Real users served by my systems",
    },
];
