import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Instagram } from "lucide-react";

const socialLinks = [
    { name: "GitHub", href: "https://github.com/Eyepatch5263", icon: Github },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/pratyush-pragyey-7a95a7258/", icon: Linkedin },
    { name: "Instagram", href: "https://instagram.com/Eyepatch_5263", icon: Instagram },
    { name: "Email", href: "mailto:pratyushpragyey@gmail.com", icon: Mail },
];

export function Footer() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo & Copyright */}
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <Link
                            href="/"
                            className="flex items-center gap-2 hover:opacity-80 transition-opacity text-foreground"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 100 100"
                                fill="none"
                                className="w-6 h-6 text-foreground"
                            >
                                <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
                                    {/* Lines (drawn behind) */}
                                    <path d="M 50 15 L 85 50 L 50 85 L 15 50 Z" />
                                    <path d="M 50 15 L 50 85" />
                                    <path d="M 15 50 L 85 50" />
                                    
                                    {/* Outer Circles (with background fill to mask lines) */}
                                    <circle cx="50" cy="15" r="8" fill="var(--background)" />
                                    <circle cx="85" cy="50" r="8" fill="var(--background)" />
                                    <circle cx="50" cy="85" r="8" fill="var(--background)" />
                                    <circle cx="15" cy="50" r="8" fill="var(--background)" />
                                    <circle cx="50" cy="50" r="8" fill="var(--background)" />
                                    
                                    {/* Inner Circles (hollow outlines) */}
                                    <circle cx="50" cy="15" r="4" />
                                    <circle cx="85" cy="50" r="4" />
                                    <circle cx="50" cy="85" r="4" />
                                    <circle cx="15" cy="50" r="4" />
                                    <circle cx="50" cy="50" r="4" />
                                </g>
                            </svg>
                            <span className="text-lg font-bold tracking-tight">
                                <span className="text-foreground">pratyush</span>
                                <span className="text-muted-foreground">.works</span>
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            © 2026 All rights reserved.
                        </p>
                    </div>

                    {/* Tagline */}
                    <p className="text-sm text-muted-foreground text-center max-w-md">
                        Building scalable systems and beautiful products with real users in mind.
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label={social.name}
                            >
                                <social.icon className="h-5 w-5" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
