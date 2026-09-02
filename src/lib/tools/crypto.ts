import { failure, success, type ToolResult } from "@/lib/utils";

export async function hashText(input: string, algorithm: "SHA-256" | "SHA-384" | "SHA-512"): Promise<ToolResult> {
  try {
    const data = new TextEncoder().encode(input);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return success(hex);
  } catch (e) {
    return failure(e instanceof Error ? e.message : "Hashing failed");
  }
}

export async function generateHmac(
  message: string,
  secret: string,
  algorithm: "SHA-256" | "SHA-384" | "SHA-512"
): Promise<ToolResult> {
  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: algorithm },
      false,
      ["sign"]
    );
    const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
    const hex = Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
    return success(hex);
  } catch (e) {
    return failure(e instanceof Error ? e.message : "HMAC generation failed");
  }
}
