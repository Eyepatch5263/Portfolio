export interface Testimonial {
    id: string;
    quote: string;
    name: string;
    role: string;
    company: string;
    context: "colleague" | "manager" | "client" | "mentor";
}

export const testimonials: Testimonial[] = [
    {
        id: "test-1",
        quote:
            "Exceptional Ui/Ux designing skills that greatly enhanced our society's online presence. Highly recommended for any project requiring top-notch design expertise.",
        name: "E-Cell NITH",
        role: "Designer and Developer",
        company: "NIT Hamirpur",
        context: "mentor",
    },
    {
        id: "test-2",
        quote:
            "Professional and thorough, delivering outstanding results for app and website user experience.",
        name: "App Team - College Club",
        role: "Designer and Developer",
        company: "NIT Hamirpur",
        context: "colleague",
    },
    {
        id: "test-3",
        quote:
            "Hard working and competitive. Attentive during grooming sessions to deliver quality Product.",
        name: "Mayuri Gedam",
        role: "Frontend Developer",
        company: "Ctrlb",
        context: "manager",
    },
    {
        id: "test-4",
        quote:
            "Creative Design and Dev skills, significantly improving our Web user experience.",
        name: "CSEC - College Society",
        role: "Full Stack Developer",
        company: "CSEC - NIT Hamirpur",
        context: "colleague",
    },
];
