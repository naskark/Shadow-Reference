import { failure, success, type ToolResult } from "@/lib/utils";

export type ParsedUrl = {
  protocol: string;
  username: string;
  password: string;
  host: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  params: Record<string, string>;
};

export function parseUrl(input: string): ToolResult {
  try {
    const url = new URL(input.trim());
    const params: Record<string, string> = {};
    url.searchParams.forEach((v, k) => { params[k] = v; });

    const output = [
      `Protocol: ${url.protocol}`,
      `Username: ${url.username || "(none)"}`,
      `Password: ${url.password ? "••••••" : "(none)"}`,
      `Host: ${url.hostname}`,
      `Port: ${url.port || "(default)"}`,
      `Pathname: ${url.pathname}`,
      `Search: ${url.search || "(none)"}`,
      `Hash: ${url.hash || "(none)"}`,
      "",
      "Query Parameters:",
      ...Object.entries(params).map(([k, v]) => `  ${k} = ${v}`),
    ].join("\n");

    return success(output);
  } catch {
    return failure("Invalid URL. Include protocol (e.g. https://example.com).");
  }
}

export type CurlParts = {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
  unsupported: string[];
};

export function parseCurl(input: string): ToolResult & { parts?: CurlParts } {
  const text = input.trim().replace(/\\\s*\n/g, " ");
  if (!text.startsWith("curl")) return failure("Input must start with 'curl'.");

  const unsupported: string[] = [];
  const headers: Record<string, string> = {};
  let method = "GET";
  let body: string | undefined;
  let url = "";

  const flagChecks = ["--compressed", "--insecure", "-k", "--cert", "--key", "--proxy"];
  for (const flag of flagChecks) {
    if (text.includes(flag)) unsupported.push(flag);
  }

  const urlMatch = text.match(/curl\s+(?:[^'"]+\s+)?['"]([^'"]+)['"]/) ?? text.match(/curl\s+(\S+)/);
  url = urlMatch?.[1] ?? "";

  if (/-X\s+(\w+)/i.test(text)) method = text.match(/-X\s+(\w+)/i)![1].toUpperCase();
  else if (/--request\s+(\w+)/i.test(text)) method = text.match(/--request\s+(\w+)/i)![1].toUpperCase();
  else if (/-d\s|--data/.test(text)) method = "POST";

  const headerRegex = /-H\s+['"]([^'"]+)['"]|--header\s+['"]([^'"]+)['"]/g;
  let hm: RegExpExecArray | null;
  while ((hm = headerRegex.exec(text)) !== null) {
    const h = hm[1] ?? hm[2];
    const idx = h.indexOf(":");
    if (idx > 0) headers[h.slice(0, idx).trim()] = h.slice(idx + 1).trim();
  }

  const dataMatch = text.match(/(?:-d|--data(?:-raw|-binary)?)\s+['"]([^'"]*)['"]/);
  if (dataMatch) body = dataMatch[1];

  if (!url) return failure("Could not extract URL from cURL command.");

  const parts: CurlParts = { url, method, headers, body, unsupported };
  return { ok: true, output: "", parts };
}

export function curlToFetch(input: string): ToolResult {
  const parsed = parseCurl(input);
  if (!parsed.ok || !parsed.parts) return parsed;

  const { url, method, headers, body, unsupported } = parsed.parts;
  const headerObj = Object.keys(headers).length
    ? `  headers: ${JSON.stringify(headers, null, 2).replace(/\n/g, "\n  ")},\n`
    : "";
  const bodyLine = body !== undefined ? `  body: ${JSON.stringify(body)},\n` : "";

  let output = `const response = await fetch("${url}", {\n  method: "${method}",\n${headerObj}${bodyLine}});\n\nconst data = await response.json();\nconsole.log(data);`;

  if (unsupported.length) {
    output += `\n\n// Unsupported flags (not converted): ${unsupported.join(", ")}`;
  }

  return success(output);
}

export function curlToAxios(input: string): ToolResult {
  const parsed = parseCurl(input);
  if (!parsed.ok || !parsed.parts) return parsed;

  const { url, method, headers, body, unsupported } = parsed.parts;
  const config: Record<string, unknown> = { method: method.toLowerCase(), url };
  if (Object.keys(headers).length) config.headers = headers;
  if (body !== undefined) config.data = body;

  let output = `import axios from "axios";\n\nconst response = await axios(${JSON.stringify(config, null, 2)});\nconsole.log(response.data);`;

  if (unsupported.length) {
    output += `\n\n// Unsupported flags (not converted): ${unsupported.join(", ")}`;
  }

  return success(output);
}

export const SAMPLE_CURL = `curl -X POST 'https://api.example.com/users' \\
  -H 'Content-Type: application/json' \\
  -d '{"name":"Alice"}'`;
