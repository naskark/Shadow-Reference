import { describe, it, expect } from "vitest";
import { getMarkdownStats, isMarkdownFilename } from "@/lib/tools/markdown";

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
});
