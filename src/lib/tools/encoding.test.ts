import { describe, it, expect } from "vitest";
import { encodeBase64, decodeBase64, encodeUrl, decodeUrl, encodeHtmlEntities, decodeHtmlEntities } from "@/lib/tools/encoding";

describe("encoding tools", () => {
  it("encodes and decodes base64", () => {
    const enc = encodeBase64("Hello");
    expect(enc.ok).toBe(true);
    if (enc.ok) {
      expect(enc.output).toBe("SGVsbG8=");
      const dec = decodeBase64(enc.output);
      expect(dec.ok).toBe(true);
      if (dec.ok) expect(dec.output).toBe("Hello");
    }
  });

  it("encodes URL components", () => {
    const result = encodeUrl("hello world", true);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.output).toBe("hello%20world");
  });

  it("decodes URL components", () => {
    const result = decodeUrl("hello%20world", true);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.output).toBe("hello world");
  });

  it("encodes HTML entities", () => {
    const result = encodeHtmlEntities("<div>");
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.output).toBe("&lt;div&gt;");
  });

  it("decodes HTML entities", () => {
    const result = decodeHtmlEntities("&lt;div&gt;");
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.output).toBe("<div>");
  });
});
