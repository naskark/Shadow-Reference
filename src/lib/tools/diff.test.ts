import { describe, it, expect } from "vitest";
import { compareLines, formatUnifiedDiff } from "@/lib/tools/diff";

describe("code compare", () => {
  it("detects added and removed lines", () => {
    const result = compareLines("line1\nline2", "line1\nline3");
    expect(result.stats.removed).toBe(1);
    expect(result.stats.added).toBe(1);
    expect(result.stats.unchanged).toBe(1);
  });

  it("reports no diff for identical input", () => {
    const result = compareLines("same\nlines", "same\nlines");
    expect(result.stats.added).toBe(0);
    expect(result.stats.removed).toBe(0);
    expect(result.stats.unchanged).toBe(2);
  });

  it("formats unified diff output", () => {
    const result = compareLines("a", "b");
    const text = formatUnifiedDiff(result);
    expect(text).toContain("- a");
    expect(text).toContain("+ b");
  });
});
