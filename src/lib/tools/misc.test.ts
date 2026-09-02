import { describe, it, expect } from "vitest";
import { escapeRegex, testRegex } from "@/lib/tools/regex";
import { unixToDatetime, datetimeToUnix } from "@/lib/tools/timestamp";
import { curlToFetch, parseCurl } from "@/lib/tools/curl";

describe("regex tools", () => {
  it("escapes metacharacters", () => {
    const result = escapeRegex("a.b(c)");
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.output).toBe("a\\.b\\(c\\)");
  });

  it("finds matches", () => {
    const result = testRegex("\\w+", "hello world", "g");
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.output).toContain("hello");
  });
});

describe("timestamp tools", () => {
  it("converts unix to datetime", () => {
    const result = unixToDatetime("0", "s");
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.output).toContain("1970");
  });

  it("converts datetime to unix", () => {
    const result = datetimeToUnix("2024-01-01T00:00:00.000Z", "s");
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.output).toBe("1704067200");
  });
});

describe("curl tools", () => {
  it("parses basic curl", () => {
    const result = parseCurl("curl https://api.example.com");
    expect(result.ok).toBe(true);
    if (result.ok && result.parts) expect(result.parts.url).toBe("https://api.example.com");
  });

  it("converts curl to fetch", () => {
    const result = curlToFetch("curl https://api.example.com");
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.output).toContain("fetch");
  });
});
