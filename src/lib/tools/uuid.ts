import { success, type ToolResult } from "@/lib/utils";

export function generateUuid(count = 1): ToolResult {
  const limit = Math.min(Math.max(1, count), 100);
  const uuids: string[] = [];
  for (let i = 0; i < limit; i++) {
    uuids.push(crypto.randomUUID());
  }
  return success(uuids.join("\n"));
}

export function generateUuidCsv(count = 1): ToolResult {
  const result = generateUuid(count);
  if (!result.ok) return result;
  return success(result.output.split("\n").join(","));
}
