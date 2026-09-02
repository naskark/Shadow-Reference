import type { MetadataRoute } from "next";
import { TOOLS, SITE_URL } from "@/data/tools";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/tools", "/about", "/privacy", "/terms", "/contact"];
  const toolPages = TOOLS.map((t) => `/tools/${t.slug}`);

  return [...staticPages, ...toolPages].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path.startsWith("/tools/") ? "monthly" : "weekly",
    priority: path === "" ? 1 : path.startsWith("/tools/") ? 0.8 : 0.5,
  }));
}
