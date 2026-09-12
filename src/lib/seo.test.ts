import { describe, expect, it } from "vitest";
import { TOOLS } from "@/data/tools";
import { TOOL_SEO } from "@/data/tool-seo";
import { buildToolJsonLd, getToolSeo } from "@/lib/seo";

describe("tool SEO", () => {
  it("covers every tool with a unique title and description", () => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();

    for (const tool of TOOLS) {
      expect(TOOL_SEO[tool.slug], `missing SEO copy for ${tool.slug}`).toBeDefined();
      const seo = getToolSeo(tool);
      expect(seo.title.length).toBeGreaterThan(20);
      expect(seo.description.length).toBeGreaterThan(80);
      expect(seo.intro.length).toBeGreaterThan(120);
      expect(seo.searchTerms.length).toBeGreaterThan(2);
      expect(seo.faqs.length).toBeGreaterThanOrEqual(3);
      expect(titles.has(seo.title)).toBe(false);
      expect(descriptions.has(seo.description)).toBe(false);
      titles.add(seo.title);
      descriptions.add(seo.description);
    }
  });

  it("emits FAQ, HowTo, and WebApplication JSON-LD", () => {
    const tool = TOOLS.find((t) => t.slug === "json-formatter");
    expect(tool).toBeDefined();
    const data = buildToolJsonLd(tool!);
    const graph = data["@graph"] as { "@type": string }[];
    const types = graph.map((node) => node["@type"]);
    expect(types).toEqual(expect.arrayContaining(["WebApplication", "FAQPage", "HowTo", "BreadcrumbList", "WebPage"]));
  });
});
