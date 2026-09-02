import { failure, success, type ToolResult } from "@/lib/utils";

export type RegexMatch = {
  match: string;
  index: number;
  groups: string[];
};

export function testRegex(pattern: string, text: string, flags: string): ToolResult {
  try {
    const regex = new RegExp(pattern, flags);
    const matches: RegexMatch[] = [];
    if (flags.includes("g")) {
      let m: RegExpExecArray | null;
      while ((m = regex.exec(text)) !== null) {
        matches.push({
          match: m[0],
          index: m.index,
          groups: m.slice(1),
        });
        if (m[0].length === 0) regex.lastIndex++;
      }
    } else {
      const m = regex.exec(text);
      if (m) {
        matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
      }
    }

    if (matches.length === 0) return success("No matches found.");

    const lines = matches.map(
      (m, i) =>
        `Match ${i + 1}: "${m.match}" at index ${m.index}${m.groups.length ? `\n  Groups: ${JSON.stringify(m.groups)}` : ""}`
    );
    return success(lines.join("\n\n"));
  } catch (e) {
    return failure(e instanceof Error ? e.message : "Invalid regular expression");
  }
}

const REGEX_SPECIAL = /[\\^$.*+?()[\]{}|]/g;

export function escapeRegex(input: string): ToolResult {
  return success(input.replace(REGEX_SPECIAL, "\\$&"));
}

export function unescapeRegex(input: string): ToolResult {
  try {
    return success(input.replace(/\\(.)/g, "$1"));
  } catch (e) {
    return failure(e instanceof Error ? e.message : "Failed to unescape");
  }
}
