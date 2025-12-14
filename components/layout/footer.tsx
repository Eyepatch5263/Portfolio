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
                            className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
                        >
                            <span className="text-foreground">pratyush</span>
                            <span className="text-muted-foreground">.works</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} All rights reserved.
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
