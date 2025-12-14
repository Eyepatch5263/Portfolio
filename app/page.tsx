import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Blogs } from "@/components/sections/blogs";
import { Testimonials } from "@/components/sections/testimonials";
import { About } from "@/components/sections/about";
import { getAllBlogPosts } from "@/lib/mdx";

export default function Home() {
  const posts = getAllBlogPosts();

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <Projects />
        <Experience />
        <Blogs posts={posts} />
        <Testimonials />
        <About />
      </main>
      <Footer />
    </>
  );
}
