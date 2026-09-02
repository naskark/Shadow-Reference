import { failure, success, type ToolResult } from "@/lib/utils";

export function encodeBase64(input: string): ToolResult {
  try {
    return success(btoa(unescape(encodeURIComponent(input))));
  } catch (e) {
    return failure(e instanceof Error ? e.message : "Failed to encode");
  }
}

export function decodeBase64(input: string): ToolResult {
  try {
    const trimmed = input.replace(/\s/g, "");
    return success(decodeURIComponent(escape(atob(trimmed))));
  } catch {
    return failure("Invalid Base64 input. Check for correct padding and characters.");
  }
}

export function encodeUrl(input: string, component = false): ToolResult {
  try {
    return success(component ? encodeURIComponent(input) : encodeURI(input));
  } catch (e) {
    return failure(e instanceof Error ? e.message : "Failed to encode URL");
  }
}

export function decodeUrl(input: string, component = false): ToolResult {
  try {
    return success(component ? decodeURIComponent(input) : decodeURI(input));
  } catch {
    return failure("Invalid URL-encoded string.");
  }
}

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function encodeHtmlEntities(input: string): ToolResult {
  const output = input.replace(/[&<>"']/g, (c) => HTML_ENTITIES[c] ?? c);
  return success(output);
}

export function decodeHtmlEntities(input: string): ToolResult {
  const textarea = typeof document !== "undefined" ? document.createElement("textarea") : null;
  if (textarea) {
    textarea.innerHTML = input;
    return success(textarea.value);
  }
  // Node/test fallback
  return success(
    input
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#x27;/g, "'")
      .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
  );
}
