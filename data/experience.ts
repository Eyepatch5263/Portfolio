export interface Experience {
    id: string;
    company: string;
    role: string;
    duration: string;
    type: "fulltime" | "internship" | "contract" | "freelance";
    description: string;
    achievements: string[];
    technologies: string[];
}

export const experiences: Experience[] = [
    {
        id: "exp-1",
        company: "App Team - College Club",
        role: "Tech Lead",
        duration: "Jan 2024 - Present",
        type: "fulltime",
        description:
            "As a Tech Lead at App Team - College Club, I am responsible for Developing and maintaining App for both clutural and tech fest of the college.",
        achievements: [
            "Built and maintained mobile applications for college cultural and tech fest events, serving 500+ students",
            "Mentored junior developers through their first app development projects, fostering technical growth",
            "Architected and deployed the club website using Next.js and Tailwind CSS with modern best practices",
            "Led development of the hackathon platform as Tech Lead and Co-organizer, managing end-to-end delivery"
        ],
        technologies: ["React.js", "Next.js", "Express.js", "Tailwind CSS", "Shadcn", "Github", "Vercel"],
    },
    {
        id: "exp-2",
        company: "Palisaodoes Foundation",
        role: "Contributor",
        duration: "Oct 2025 - present",
        type: "fulltime",
        description:
            "As a contributor during Hacktoberfest at Palisaodoes Foundation, I worked on enhancing the overall code reliability and development workflow of open - source projects.My key contributions included:",
        achievements: [
            "Increasing unit and integration test coverage using Jest to ensure better code stability.",
            "Updating and managing package dependencies and versioning to maintain compatibility and performance.",
            "Improving GitHub Actions workflows for streamlined CI/ CD automation.",
            "Ensuring configuration file consistency across multiple repositories for better maintainability and scalability."
        ],
        technologies: ["React.js", "TypeScript", "Docker", "Jest", "Vitest", "Github", "CI/CD"],
    },
    {
        id: "exp-3",
        company: "Ctrlb",
        role: "Frontend Developer",
        duration: "Jan 2020 - May 2021",
        type: "internship",
        description:
            "Built Smooth Workflows and Responsive Design for the company internal tools. ",
        achievements: [
            "Designed and implemented smooth, responsive workflows and user interfaces to enhance usability and overall product experience.",
            "Integrated RESTful APIs to ensure dynamic and real - time data flow across the application.",
            "Managed complex application states using modern state management libraries and optimized data handling for performance and scalability.",
            "Debugged and resolved critical frontend issues, improving stability and reducing production bugs."
        ],
        technologies: ["Next.js", "React.js", "PostgreSQL", "Tailwind CSS", "Vercel", "Github", "Shadcn", "Go"],
    },
    {
        id: "exp-4",
        company: "",
        role: "Ui/Ux Designer",
        duration: "Jun 2025 - Feb 2025",
        type: "internship",
        description:
            "Ui/Ux Designer Intern. Developed wireframes and high-fidelity mockups for the company website, improving user engagement. ",
        achievements: [
            "Designed wireframes and high-fidelity mockups for the company website, improving user engagement",
            "Created brand identity assets including the company logo and visual guidelines",
            "Collaborated with cross-functional design team to establish consistent UI patterns and workflows"
        ],
        technologies: ["Figma", "Adobe XD", "Adobe Illustrator", "Adobe Photoshop"],
    },
];
