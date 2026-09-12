import { describe, expect, it } from "vitest";
import { matchesExtension, validateUploadFile, MAX_UPLOAD_BYTES } from "@/lib/files";

describe("file upload validation", () => {
  it("accepts matching extensions", () => {
    expect(matchesExtension("payload.json", [".json"])).toBe(true);
    expect(matchesExtension("README.MD", [".md", ".markdown"])).toBe(true);
    expect(matchesExtension("app.ts", [".js", ".ts"])).toBe(true);
  });

  it("rejects unknown types", () => {
    expect(matchesExtension("photo.png", [".json"])).toBe(false);
    expect(validateUploadFile({ name: "photo.png", size: 12 }, [".json"])).toMatch(/upload a \.json/i);
  });

  it("rejects files over the size limit", () => {
    const message = validateUploadFile({ name: "huge.json", size: MAX_UPLOAD_BYTES + 1 }, [".json"]);
    expect(message).toMatch(/2 MB/i);
  });

  it("accepts files within the size limit", () => {
    expect(validateUploadFile({ name: "ok.json", size: 1024 }, [".json"])).toBeNull();
  });
});
