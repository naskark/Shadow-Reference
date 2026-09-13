import type { MetadataRoute } from "next";
import { TOOLS, SITE_URL } from "@/data/tools";
import { POPULAR_TOOL_SLUGS } from "@/lib/seo";

export const dynamic = "force-static";

const LAST_MODIFIED = new Date("2026-09-13");
const popular = new Set<string>(POPULAR_TOOL_SLUGS);

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: LAST_MODIFIED, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/tools`, lastModified: LAST_MODIFIED, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/privacy`, lastModified: LAST_MODIFIED, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified: LAST_MODIFIED, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/contact`, lastModified: LAST_MODIFIED, changeFrequency: "yearly", priority: 0.3 },
  ];

  const toolPages: MetadataRoute.Sitemap = TOOLS.map((t) => ({
    url: `${SITE_URL}/tools/${t.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: popular.has(t.slug) ? 0.9 : 0.7,
  }));

  return [...staticPages, ...toolPages];
}
