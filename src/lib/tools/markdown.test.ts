import { describe, it, expect } from "vitest";
import { getMarkdownStats, isMarkdownFilename, renderMarkdown } from "@/lib/tools/markdown";

describe("markdown reader", () => {
  it("calculates stats", () => {
    const stats = getMarkdownStats("# Hello\n\nWorld test");
    expect(stats.lines).toBe(3);
    expect(stats.words).toBe(4);
    expect(stats.characters).toBeGreaterThan(0);
  });

  it("accepts markdown filenames", () => {
    expect(isMarkdownFilename("readme.md")).toBe(true);
    expect(isMarkdownFilename("notes.markdown")).toBe(true);
    expect(isMarkdownFilename("file.txt")).toBe(true);
    expect(isMarkdownFilename("image.png")).toBe(false);
  });

  it("highlights fenced javascript and keeps gfm tables", async () => {
    const html = await renderMarkdown(
      '```js\nconst n = 1;\n```\n\n| A | B |\n| --- | --- |\n| 1 | 2 |\n',
    );
    expect(html).toContain("hljs");
    expect(html).toContain("hljs-keyword");
    expect(html).toContain("<table>");
    expect(html).not.toContain("<script>");
  });
});
