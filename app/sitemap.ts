import { MetadataRoute } from "next";
import { getBlogSlugsByType } from "@/lib/mdx";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://pratyush.works";

  // Core pages
  const coreRoutes = ["", "/blog", "/projects/anima", "/projects/explainbytes", "/projects/collabrative-editor"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic engineering blogs
  const engineeringSlugs = getBlogSlugsByType("engineering");
  const engineeringRoutes = engineeringSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}?type=engineering`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic tech blogs
  const techSlugs = getBlogSlugsByType("tech");
  const techRoutes = techSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}?type=tech`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...coreRoutes, ...engineeringRoutes, ...techRoutes];
}
