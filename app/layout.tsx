import type { Metadata } from "next";
import {Inria_Serif } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inriaSerif = Inria_Serif({
  subsets: ["latin"],
  variable: "--font-inria-serif",
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Software Engineer Portfolio | System Design & Startup Builder",
  description:
    "Software engineer specializing in system design, scalable architectures, and building products at startups. View case studies and engineering insights.",
  keywords: [
    "software engineer",
    "system design",
    "startup",
    "full stack developer",
    "backend engineer",
    "portfolio",
  ],
  authors: [{ name: "Developer" }],
  openGraph: {
    title: "Software Engineer Portfolio",
    description: "Building scalable systems and beautiful products with real users in mind.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inriaSerif.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
