import { failure, success, type ToolResult } from "@/lib/utils";

export function parseJson(input: string): ToolResult & { data?: unknown } {
  try {
    const data = JSON.parse(input);
    return { ok: true, output: "", data };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Invalid JSON";
    const match = msg.match(/position (\d+)/i);
    if (match) {
      const pos = Number(match[1]);
      const lines = input.slice(0, pos).split("\n");
      const line = lines.length;
      const column = lines[lines.length - 1].length + 1;
      return failure(`Invalid JSON at line ${line}, column ${column}: ${msg}`);
    }
    return failure(`Invalid JSON: ${msg}`);
  }
}

export function formatJson(input: string, spaces = 2): ToolResult {
  const parsed = parseJson(input);
  if (!parsed.ok) return parsed;
  return success(JSON.stringify(parsed.data, null, spaces));
}

export function minifyJson(input: string): ToolResult {
  const parsed = parseJson(input);
  if (!parsed.ok) return parsed;
  return success(JSON.stringify(parsed.data));
}

export function validateJson(input: string): ToolResult {
  const parsed = parseJson(input);
  if (!parsed.ok) return parsed;
  return success("Valid JSON ✓");
}

export function jsonToTypeScript(input: string, rootName = "Root"): ToolResult {
  const parsed = parseJson(input);
  if (!parsed.ok) return parsed;

  function toType(value: unknown, name: string): string {
    if (value === null) return "null";
    if (Array.isArray(value)) {
      if (value.length === 0) return "unknown[]";
      const types = [...new Set(value.map((v) => toType(v, name + "Item")))];
      return types.length === 1 ? `${types[0]}[]` : `(${types.join(" | ")})[]`;
    }
    if (typeof value === "object") {
      const entries = Object.entries(value as Record<string, unknown>);
      if (entries.length === 0) return "Record<string, never>";
      const props = entries
        .map(([key, val]) => {
          const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
          return `  ${safeKey}: ${toType(val, key)};`;
        })
        .join("\n");
      return `{\n${props}\n}`;
    }
    return typeof value;
  }

  const typeBody = toType(parsed.data, rootName);
  const output =
    typeBody.startsWith("{") || typeBody.startsWith("(")
      ? `export type ${rootName} = ${typeBody};`
      : `export type ${rootName} = ${typeBody};`;

  return success(output);
}

function escapeCsvValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  let str: string;
  if (typeof value === "object") str = JSON.stringify(value);
  else str = String(value);
  if (/[",\n\r]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

export function jsonToCsv(input: string): ToolResult {
  const parsed = parseJson(input);
  if (!parsed.ok) return parsed;
  if (!Array.isArray(parsed.data)) return failure("Input must be a JSON array of objects.");
  if (parsed.data.length === 0) return success("");

  const columns = [...new Set(parsed.data.flatMap((row) => (typeof row === "object" && row ? Object.keys(row) : [])))];
  const header = columns.map(escapeCsvValue).join(",");
  const rows = parsed.data.map((row) => {
    if (typeof row !== "object" || !row) return columns.map(() => "").join(",");
    const record = row as Record<string, unknown>;
    return columns.map((col) => escapeCsvValue(record[col])).join(",");
  });
  return success([header, ...rows].join("\n"));
}

export const SAMPLE_JSON = `{
  "name": "ShadowReference",
  "version": 1,
  "tools": ["json-formatter", "jwt-decoder"],
  "meta": { "clientSide": true }
}`;
