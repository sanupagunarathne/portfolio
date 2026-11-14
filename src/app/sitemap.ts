import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getSiteOrigin } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteOrigin();
  if (!origin) return [];
  return ["/", ...projects.map(project => `/projects/${project.slug}`)].map(path => ({ url: new URL(path, origin).href }));
}
