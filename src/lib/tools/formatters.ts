import { failure, success, type ToolResult } from "@/lib/utils";

export function formatCss(input: string, minify = false): ToolResult {
  if (minify) {
    const min = input
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\s+/g, " ")
      .replace(/\s*([{}:;,>+~])\s*/g, "$1")
      .replace(/;}/g, "}")
      .trim();
    return success(min);
  }

  let depth = 0;
  const formatted = input
    .replace(/\s*{\s*/g, " {\n")
    .replace(/\s*}\s*/g, "\n}\n")
    .replace(/\s*;\s*/g, ";\n")
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return "";
      if (trimmed.includes("}")) depth = Math.max(0, depth - 1);
      const indented = "  ".repeat(depth) + trimmed;
      if (trimmed.includes("{")) depth++;
      return indented;
    })
    .filter(Boolean)
    .join("\n");

  return success(formatted);
}

export function formatHtml(input: string, minify = false): ToolResult {
  if (minify) {
    return success(input.replace(/>\s+</g, "><").replace(/\s+/g, " ").trim());
  }

  let formatted = "";
  let indent = 0;
  const tokens = input.replace(/></g, ">\n<").split("\n");
  for (const token of tokens) {
    const line = token.trim();
    if (!line) continue;
    if (line.startsWith("</")) indent = Math.max(0, indent - 1);
    formatted += "  ".repeat(indent) + line + "\n";
    if (line.startsWith("<") && !line.startsWith("</") && !line.endsWith("/>") && !line.includes("</")) {
      if (!/^<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)/i.test(line)) indent++;
    }
  }
  return success(formatted.trim());
}

export function formatJs(input: string, minify = false): ToolResult {
  if (minify) {
    return success(
      input
        .replace(/\/\/.*$/gm, "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s+/g, " ")
        .replace(/\s*([{}();,:])\s*/g, "$1")
        .trim()
    );
  }

  let depth = 0;
  const lines = input.split("\n").map((line) => {
    let trimmed = line.trim();
    if (!trimmed) return "";
    if (/^[}\])]/.test(trimmed)) depth = Math.max(0, depth - 1);
    const result = "  ".repeat(depth) + trimmed;
    const opens = (trimmed.match(/[{[(]/g) ?? []).length;
    const closes = (trimmed.match(/[}\])]/g) ?? []).length;
    depth += opens - closes;
    if (depth < 0) depth = 0;
    return result;
  });
  return success(lines.filter((l) => l !== "").join("\n"));
}

const SQL_KEYWORDS = [
  "SELECT", "FROM", "WHERE", "JOIN", "LEFT", "RIGHT", "INNER", "OUTER", "ON", "AND", "OR",
  "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE", "ORDER", "BY", "GROUP", "HAVING",
  "LIMIT", "OFFSET", "AS", "DISTINCT", "CREATE", "TABLE", "ALTER", "DROP",
];

export function formatSql(input: string): ToolResult {
  let sql = input.replace(/\s+/g, " ").trim();
  for (const kw of SQL_KEYWORDS) {
    sql = sql.replace(new RegExp(`\\b${kw}\\b`, "gi"), kw);
  }

  const breakBefore = ["SELECT", "FROM", "WHERE", "JOIN", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN",
    "ORDER BY", "GROUP BY", "HAVING", "LIMIT", "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM"];

  for (const clause of breakBefore) {
    sql = sql.replace(new RegExp(`\\b${clause}\\b`, "g"), `\n${clause}`);
  }

  return success(sql.trim());
}

export const SAMPLE_CSS = `.container { display: flex; gap: 1rem; }\n.item { padding: 8px; }`;
export const SAMPLE_HTML = `<div class="card"><h1>Title</h1><p>Content</p></div>`;
export const SAMPLE_JS = `function greet(name) {\n  return "Hello, " + name;\n}`;
export const SAMPLE_SQL = `SELECT id, name FROM users WHERE active = true ORDER BY name LIMIT 10`;
