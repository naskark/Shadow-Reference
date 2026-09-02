import { failure, success, type ToolResult } from "@/lib/utils";

export type JwtParts = {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  expiresAt?: string;
  isExpired?: boolean;
};

function decodeBase64Url(part: string): string {
  const padded = part.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  const decoded = atob(padded + pad);
  return decodeURIComponent(
    decoded.split("").map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, "0")}`).join("")
  );
}

export function decodeJwt(input: string): ToolResult {
  const token = input.trim();
  const parts = token.split(".");
  if (parts.length !== 3) return failure("JWT must have exactly 3 parts separated by dots (header.payload.signature).");

  try {
    const header = JSON.parse(decodeBase64Url(parts[0])) as Record<string, unknown>;
    const payload = JSON.parse(decodeBase64Url(parts[1])) as Record<string, unknown>;
    const signature = parts[2];

    let expiresAt: string | undefined;
    let isExpired: boolean | undefined;
    if (typeof payload.exp === "number") {
      expiresAt = new Date(payload.exp * 1000).toISOString();
      isExpired = Date.now() > payload.exp * 1000;
    }

    const output = [
      "⚠️ Decoding only — this does NOT verify the signature.",
      "",
      "=== HEADER ===",
      JSON.stringify(header, null, 2),
      "",
      "=== PAYLOAD ===",
      JSON.stringify(payload, null, 2),
      "",
      "=== SIGNATURE (encoded) ===",
      signature,
      expiresAt ? `\n=== EXPIRATION ===\n${expiresAt}${isExpired ? " (expired)" : " (valid)"}` : "",
    ].join("\n");

    return success(output, { expiresAt: expiresAt ?? "", isExpired: String(isExpired ?? "") });
  } catch (e) {
    return failure(e instanceof Error ? e.message : "Failed to decode JWT");
  }
}

export const SAMPLE_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZoiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
