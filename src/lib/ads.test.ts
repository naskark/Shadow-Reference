import { describe, expect, it } from "vitest";
import { adsTxtLine, isAdsenseClientId } from "@/lib/ads";

describe("ads config", () => {
  it("accepts a valid AdSense client id", () => {
    expect(isAdsenseClientId("ca-pub-1234567890123456")).toBe(true);
    expect(isAdsenseClientId("pub-123")).toBe(false);
    expect(isAdsenseClientId("")).toBe(false);
  });

  it("builds ads.txt from the client id", () => {
    expect(adsTxtLine("ca-pub-1234567890123456")).toBe(
      "google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0",
    );
    expect(adsTxtLine("")).toBeNull();
  });
});
