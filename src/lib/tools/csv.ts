import { failure, success, type ToolResult } from "@/lib/utils";
import { jsonToCsv } from "@/lib/tools/json";

function parseCsvLine(line: string, delimiter: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') { current += '"'; i++; }
        else inQuotes = false;
      } else current += ch;
    } else {
      if (ch === '"') inQuotes = true;
      else if (ch === delimiter) { result.push(current); current = ""; }
      else current += ch;
    }
  }
  result.push(current);
  return result;
}

export function csvToJson(input: string, delimiter = ",", hasHeader = true): ToolResult {
  const lines = input.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return success("[]");

  const rows = lines.map((line) => parseCsvLine(line, delimiter));
  if (hasHeader) {
    const headers = rows[0];
    const data = rows.slice(1).map((row) => {
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => { obj[h] = row[i] ?? ""; });
      return obj;
    });
    return success(JSON.stringify(data, null, 2));
  }
  return success(JSON.stringify(rows, null, 2));
}

export function jsonArrayToCsv(input: string): ToolResult {
  return jsonToCsv(input);
}

export function csvJsonConvert(input: string, mode: "csv-to-json" | "json-to-csv", delimiter = ","): ToolResult {
  if (mode === "csv-to-json") return csvToJson(input, delimiter);
  return jsonArrayToCsv(input);
}

export const SAMPLE_CSV = `name,role,active
Alice,Engineer,true
Bob,Designer,true`;
