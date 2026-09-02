import { describe, it, expect } from "vitest";
import { formatJson, minifyJson, validateJson, jsonToTypeScript, jsonToCsv, parseJson } from "@/lib/tools/json";

describe("json tools", () => {
  it("formats valid JSON", () => {
    const result = formatJson('{"a":1}');
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.output).toContain('"a": 1');
  });

  it("reports invalid JSON", () => {
    const result = parseJson("{bad}");
    expect(result.ok).toBe(false);
  });

  it("validates JSON", () => {
    expect(validateJson("{}").ok).toBe(true);
    expect(validateJson("{").ok).toBe(false);
  });

  it("minifies JSON", () => {
    const result = minifyJson('{ "a" : 1 }');
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.output).toBe('{"a":1}');
  });

  it("converts JSON to TypeScript", () => {
    const result = jsonToTypeScript('{"id":1,"active":true}');
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toContain("export type Root");
      expect(result.output).toContain("id: number");
    }
  });

  it("converts JSON array to CSV", () => {
    const result = jsonToCsv('[{"a":1,"b":2}]');
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.output).toBe("a,b\n1,2");
  });
});
