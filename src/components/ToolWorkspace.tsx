"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ActionBar } from "@/components/ActionBar";
import { Editor } from "@/components/Editor";
import { OutputPanel } from "@/components/OutputPanel";
import { ErrorMessage } from "@/components/ErrorMessage";
import type { ToolDefinition } from "@/data/tools";
import { HTTP_STATUS_CODES } from "@/data/http-status-codes";
import { byteSize, formatBytes } from "@/lib/utils";
import { formatJson, minifyJson, validateJson, jsonToTypeScript, jsonToCsv, SAMPLE_JSON } from "@/lib/tools/json";
import { jsonToYaml, yamlToJson, validateYaml, formatYaml, SAMPLE_YAML } from "@/lib/tools/yaml";
import { encodeBase64, decodeBase64, encodeUrl, decodeUrl, encodeHtmlEntities, decodeHtmlEntities } from "@/lib/tools/encoding";
import { decodeJwt, SAMPLE_JWT } from "@/lib/tools/jwt";
import { testRegex, escapeRegex, unescapeRegex } from "@/lib/tools/regex";
import { unixToDatetime, datetimeToUnix, currentTimestamp, allDatetimeFormats } from "@/lib/tools/timestamp";
import { convertColor } from "@/lib/tools/color";
import { formatCss, formatHtml, formatJs, formatSql, SAMPLE_CSS, SAMPLE_HTML, SAMPLE_JS, SAMPLE_SQL } from "@/lib/tools/formatters";
import { csvJsonConvert, SAMPLE_CSV } from "@/lib/tools/csv";
import { formatXml, validateXml, SAMPLE_XML } from "@/lib/tools/xml";
import { hashText, generateHmac } from "@/lib/tools/crypto";
import { curlToFetch, curlToAxios, parseUrl, SAMPLE_CURL } from "@/lib/tools/curl";
import { generateUuid } from "@/lib/tools/uuid";
import { MarkdownReaderTool } from "@/components/tools/MarkdownReaderTool";
import { CodeCompareTool } from "@/components/tools/CodeCompareTool";

type Props = { tool: ToolDefinition };

export function ToolWorkspace({ tool }: Props) {
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<string>("");

  // Tool-specific state
  const [flags, setFlags] = useState("g");
  const [indent, setIndent] = useState(2);
  const [rootName, setRootName] = useState("Root");
  const [delimiter, setDelimiter] = useState(",");
  const [uuidCount, setUuidCount] = useState(5);
  const [hashAlgo, setHashAlgo] = useState<"SHA-256" | "SHA-384" | "SHA-512">("SHA-256");
  const [hmacSecret, setHmacSecret] = useState("");
  const [timestampUnit, setTimestampUnit] = useState<"s" | "ms">("s");
  const [urlComponent, setUrlComponent] = useState(false);
  const [formatterMinify, setFormatterMinify] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [colorPreview, setColorPreview] = useState("");
  const [markdownHtml, setMarkdownHtml] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");

  const run = useCallback(async () => {
    setError("");
    setColorPreview("");
    setQrDataUrl("");

    let result;

    switch (tool.kind) {
      case "transform":
        if (tool.slug === "json-formatter") result = formatJson(input, indent);
        else if (tool.slug === "json-validator") result = validateJson(input);
        else if (tool.slug === "json-minifier") result = minifyJson(input);
        else if (tool.slug === "json-to-typescript") result = jsonToTypeScript(input, rootName);
        else if (tool.slug === "json-to-csv") result = jsonToCsv(input);
        else result = { ok: false as const, error: "Unknown tool" };
        break;

      case "dual":
        if (tool.slug === "json-yaml") result = mode === "yaml-to-json" ? yamlToJson(input) : jsonToYaml(input);
        else if (tool.slug === "base64-encoder-decoder") result = mode === "decode" ? decodeBase64(input) : encodeBase64(input);
        else if (tool.slug === "url-encoder-decoder") result = mode === "decode" ? decodeUrl(input, urlComponent) : encodeUrl(input, urlComponent);
        else if (tool.slug === "html-entity-encoder-decoder") result = mode === "decode" ? decodeHtmlEntities(input) : encodeHtmlEntities(input);
        else if (tool.slug === "regex-escape-unescape") result = mode === "unescape" ? unescapeRegex(input) : escapeRegex(input);
        else result = { ok: false as const, error: "Unknown tool" };
        break;

      case "jwt":
        result = decodeJwt(input);
        break;

      case "regex":
        result = testRegex(input, input2, flags);
        break;

      case "timestamp":
        if (mode === "now") result = currentTimestamp(timestampUnit);
        else if (mode === "to-unix") result = datetimeToUnix(input, timestampUnit);
        else result = unixToDatetime(input, timestampUnit);
        break;

      case "datetime":
        result = allDatetimeFormats(input);
        break;

      case "url-parser":
        result = parseUrl(input);
        break;

      case "uuid":
        result = generateUuid(uuidCount);
        break;

      case "color":
        result = convertColor(input);
        if (result.ok && result.meta?.preview) setColorPreview(result.meta.preview);
        break;

      case "formatter":
        if (tool.slug === "css-formatter") result = formatCss(input, formatterMinify);
        else if (tool.slug === "html-formatter") result = formatHtml(input, formatterMinify);
        else if (tool.slug === "javascript-formatter") result = formatJs(input, formatterMinify);
        else if (tool.slug === "sql-formatter") result = formatSql(input);
        else result = { ok: false as const, error: "Unknown formatter" };
        break;

      case "csv-json":
        result = csvJsonConvert(input, mode === "json-to-csv" ? "json-to-csv" : "csv-to-json", delimiter);
        break;

      case "yaml":
        result = mode === "format" ? formatYaml(input) : validateYaml(input);
        break;

      case "xml":
        result = mode === "validate" ? validateXml(input) : formatXml(input);
        break;

      case "crypto-hash":
        result = await hashText(input, hashAlgo);
        break;

      case "crypto-hmac":
        result = await generateHmac(input, hmacSecret, hashAlgo);
        break;

      case "curl":
        result = tool.slug === "curl-to-axios" ? curlToAxios(input) : curlToFetch(input);
        break;

      case "qr":
        try {
          const QRCode = (await import("qrcode")).default;
          const url = await QRCode.toDataURL(input, { width: 256, margin: 2 });
          setQrDataUrl(url);
          result = { ok: true as const, output: "QR code generated. Download the image below." };
        } catch (e) {
          result = { ok: false as const, error: e instanceof Error ? e.message : "QR generation failed" };
        }
        break;

      default:
        result = { ok: false as const, error: "Unsupported tool" };
    }

    if (result.ok) {
      setOutput(result.output);
    } else {
      setOutput("");
      setError(result.error);
    }
  }, [tool, input, input2, mode, indent, rootName, delimiter, flags, timestampUnit, urlComponent, formatterMinify, hashAlgo, hmacSecret, uuidCount]);

  const loadSample = useCallback(() => {
    const samples: Record<string, string> = {
      "json-formatter": SAMPLE_JSON,
      "json-validator": SAMPLE_JSON,
      "json-minifier": SAMPLE_JSON,
      "json-to-typescript": '{"id":1,"name":"Alice","tags":["dev"]}',
      "json-to-csv": '[{"name":"Alice","role":"Engineer"}]',
      "json-yaml": SAMPLE_JSON,
      "jwt-decoder": SAMPLE_JWT,
      "base64-encoder-decoder": "Hello, ShadowReference!",
      "url-encoder-decoder": "hello world & foo=bar",
      "html-entity-encoder-decoder": '<div class="test">Hello & "world"</div>',
      "url-parser": "https://example.com:8080/path?q=search&page=1#top",
      "regex-tester": "",
      "regex-escape-unescape": "price.is $19.99 (sale)",
      "timestamp-converter": String(Math.floor(Date.now() / 1000)),
      "date-time-converter": new Date().toISOString(),
      "color-converter": "#3b82f6",
      "css-formatter": SAMPLE_CSS,
      "html-formatter": SAMPLE_HTML,
      "javascript-formatter": SAMPLE_JS,
      "sql-formatter": SAMPLE_SQL,
      "markdown-previewer": tool.sampleInput,
      "csv-json": SAMPLE_CSV,
      "yaml-validator": SAMPLE_YAML,
      "xml-formatter": SAMPLE_XML,
      "hash-generator": "ShadowReference",
      "hmac-generator": "message",
      "curl-to-fetch": SAMPLE_CURL,
      "curl-to-axios": SAMPLE_CURL,
      "qr-code-generator": "https://shadowreference.dev",
    };
    setInput(samples[tool.slug] ?? tool.sampleInput);
    if (tool.kind === "regex") {
      setInput("\\w+");
      setInput2("The quick brown fox jumps over the lazy dog.");
    }
    if (tool.kind === "crypto-hmac") setHmacSecret("secret-key");
    setError("");
    setOutput("");
  }, [tool]);

  useEffect(() => {
    // Set sensible defaults per tool
    if (tool.kind === "dual") {
      if (tool.slug === "json-yaml") setMode("json-to-yaml");
      else setMode("encode");
    }
    if (tool.kind === "csv-json") setMode("csv-to-json");
    if (tool.kind === "yaml") setMode("validate");
    if (tool.kind === "xml") setMode("format");
    if (tool.kind === "timestamp") setMode("to-date");
  }, [tool]);

  // Markdown live preview
  useEffect(() => {
    if (tool.kind !== "markdown") return;
    let cancelled = false;
    (async () => {
      try {
        const { marked } = await import("marked");
        const DOMPurify = (await import("isomorphic-dompurify")).default;
        const raw = await marked.parse(input || "");
        if (!cancelled) setMarkdownHtml(DOMPurify.sanitize(typeof raw === "string" ? raw : ""));
      } catch {
        if (!cancelled) setMarkdownHtml("");
      }
    })();
    return () => { cancelled = true; };
  }, [input, tool.kind]);

  const primaryLabel = useMemo(() => {
    const labels: Record<string, string> = {
      "json-formatter": "Format",
      "json-validator": "Validate",
      "json-minifier": "Minify",
      "json-to-typescript": "Convert",
      "json-to-csv": "Convert",
      "jwt-decoder": "Decode",
      "url-parser": "Parse",
      "uuid-generator": "Generate",
      "regex-tester": "Test",
      "timestamp-converter": "Convert",
      "date-time-converter": "Convert",
      "color-converter": "Convert",
      "markdown-previewer": "Preview",
      "hash-generator": "Generate",
      "hmac-generator": "Generate",
      "curl-to-fetch": "Convert",
      "curl-to-axios": "Convert",
      "qr-code-generator": "Generate",
    };
    if (tool.kind === "dual") return mode.includes("decode") || mode.includes("yaml-to") || mode === "unescape" ? "Decode / Convert" : "Encode / Convert";
    if (tool.kind === "formatter") return formatterMinify ? "Minify" : "Format";
    if (tool.kind === "yaml") return mode === "format" ? "Format" : "Validate";
    if (tool.kind === "xml") return mode === "validate" ? "Validate" : "Format";
    if (tool.kind === "csv-json") return "Convert";
    return labels[tool.slug] ?? "Run";
  }, [tool, mode, formatterMinify]);

  const sizeMeta = tool.slug === "json-minifier" && input && output
    ? `${formatBytes(byteSize(input))} → ${formatBytes(byteSize(output))}`
    : null;

  // HTTP Status reference - special UI
  if (tool.kind === "http-status") {
    const filtered = HTTP_STATUS_CODES.filter(
      (c) =>
        !searchQuery ||
        String(c.code).includes(searchQuery) ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="space-y-4">
        <input
          type="search"
          placeholder="Search status codes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="tool-textarea w-full rounded-xl px-4 py-3 text-sm"
          aria-label="Search HTTP status codes"
        />
        <div className="max-h-[480px] overflow-y-auto rounded-xl border border-[var(--card-border)] bg-[var(--code-bg)]/50 backdrop-blur">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-[var(--card-solid)]/95 backdrop-blur">
              <tr className="border-b border-[var(--card-border)]">
                <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wider text-[var(--accent)]">Code</th>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">Description</th>
                <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Typical Use</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.code} className="border-b border-[var(--card-border)]/50 transition hover:bg-[var(--accent-glow)]">
                  <td className="px-4 py-3 font-mono font-semibold text-[var(--accent)]">{c.code}</td>
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-[var(--muted)] hidden sm:table-cell">{c.description}</td>
                  <td className="px-4 py-3 text-[var(--muted)] hidden md:table-cell">{c.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Markdown file reader
  if (tool.kind === "markdown-reader") {
    return <MarkdownReaderTool />;
  }

  // Code compare
  if (tool.kind === "code-compare") {
    return <CodeCompareTool />;
  }

  // Markdown previewer - special split view
  if (tool.kind === "markdown") {
    return (
      <div className="space-y-4">
        <ActionBar
          onPrimary={() => {}}
          primaryLabel="Live Preview"
          onSample={loadSample}
          onClear={() => { setInput(""); setMarkdownHtml(""); }}
          output={input}
          downloadFilename="document.md"
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <Editor id="md-input" label="Markdown" value={input} onChange={setInput} rows={16} placeholder="Write Markdown here..." />
          <div>
            <p className="mb-1.5 text-sm font-medium">Preview</p>
            <div
              className="markdown-preview min-h-[320px] rounded-lg border border-[var(--card-border)] bg-[var(--input-bg)] p-4 text-sm"
              dangerouslySetInnerHTML={{ __html: markdownHtml }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mode toggles */}
      {tool.kind === "dual" && (
        <div className="flex flex-wrap gap-2">
          {tool.slug === "json-yaml" ? (
            <>
              <button type="button" className={mode === "json-to-yaml" ? "btn-primary text-sm" : "btn-secondary text-sm"} onClick={() => setMode("json-to-yaml")}>JSON → YAML</button>
              <button type="button" className={mode === "yaml-to-json" ? "btn-primary text-sm" : "btn-secondary text-sm"} onClick={() => setMode("yaml-to-json")}>YAML → JSON</button>
            </>
          ) : (
            <>
              <button type="button" className={mode === "encode" ? "btn-primary text-sm" : "btn-secondary text-sm"} onClick={() => setMode("encode")}>Encode</button>
              <button type="button" className={mode === "decode" ? "btn-primary text-sm" : "btn-secondary text-sm"} onClick={() => setMode("decode")}>Decode</button>
            </>
          )}
          {tool.slug === "url-encoder-decoder" && (
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={urlComponent} onChange={(e) => setUrlComponent(e.target.checked)} />
              Component mode
            </label>
          )}
        </div>
      )}

      {tool.kind === "csv-json" && (
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className={mode === "csv-to-json" ? "btn-primary text-sm" : "btn-secondary text-sm"} onClick={() => setMode("csv-to-json")}>CSV → JSON</button>
          <button type="button" className={mode === "json-to-csv" ? "btn-primary text-sm" : "btn-secondary text-sm"} onClick={() => setMode("json-to-csv")}>JSON → CSV</button>
          <label className="text-sm">Delimiter: <input value={delimiter} onChange={(e) => setDelimiter(e.target.value)} className="tool-textarea ml-1 w-12 rounded px-2 py-1 text-center" maxLength={1} /></label>
        </div>
      )}

      {tool.kind === "yaml" && (
        <div className="flex gap-2">
          <button type="button" className={mode === "validate" ? "btn-primary text-sm" : "btn-secondary text-sm"} onClick={() => setMode("validate")}>Validate</button>
          <button type="button" className={mode === "format" ? "btn-primary text-sm" : "btn-secondary text-sm"} onClick={() => setMode("format")}>Format</button>
        </div>
      )}

      {tool.kind === "xml" && (
        <div className="flex gap-2">
          <button type="button" className={mode === "format" ? "btn-primary text-sm" : "btn-secondary text-sm"} onClick={() => setMode("format")}>Format</button>
          <button type="button" className={mode === "validate" ? "btn-primary text-sm" : "btn-secondary text-sm"} onClick={() => setMode("validate")}>Validate</button>
        </div>
      )}

      {tool.slug === "json-formatter" && (
        <label className="text-sm">Indentation:
          <select value={indent} onChange={(e) => setIndent(Number(e.target.value))} className="tool-textarea ml-2 rounded px-2 py-1">
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        </label>
      )}

      {tool.slug === "json-to-typescript" && (
        <label className="text-sm">Root type name:
          <input value={rootName} onChange={(e) => setRootName(e.target.value)} className="tool-textarea ml-2 rounded px-2 py-1" />
        </label>
      )}

      {tool.kind === "formatter" && tool.slug !== "sql-formatter" && (
        <div className="flex gap-2">
          <button type="button" className={!formatterMinify ? "btn-primary text-sm" : "btn-secondary text-sm"} onClick={() => setFormatterMinify(false)}>Format</button>
          <button type="button" className={formatterMinify ? "btn-primary text-sm" : "btn-secondary text-sm"} onClick={() => setFormatterMinify(true)}>Minify</button>
        </div>
      )}

      {tool.kind === "regex" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Editor id="regex-pattern" label="Pattern" value={input} onChange={setInput} rows={3} placeholder="e.g. \\w+" />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="regex-flags" className="text-sm font-medium">Flags</label>
            <input id="regex-flags" value={flags} onChange={(e) => setFlags(e.target.value)} className="tool-textarea rounded-lg px-3 py-2 text-sm" placeholder="gim" />
          </div>
        </div>
      )}

      {tool.kind === "timestamp" && (
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className={mode === "to-date" ? "btn-primary text-sm" : "btn-secondary text-sm"} onClick={() => setMode("to-date")}>Unix → Date</button>
          <button type="button" className={mode === "to-unix" ? "btn-primary text-sm" : "btn-secondary text-sm"} onClick={() => setMode("to-unix")}>Date → Unix</button>
          <button type="button" className="btn-secondary text-sm" onClick={() => { setMode("now"); void run(); }}>Now</button>
          <label className="text-sm">Unit:
            <select value={timestampUnit} onChange={(e) => setTimestampUnit(e.target.value as "s" | "ms")} className="tool-textarea ml-1 rounded px-2 py-1">
              <option value="s">Seconds</option>
              <option value="ms">Milliseconds</option>
            </select>
          </label>
        </div>
      )}

      {(tool.kind === "crypto-hash" || tool.kind === "crypto-hmac") && (
        <label className="text-sm">Algorithm:
          <select value={hashAlgo} onChange={(e) => setHashAlgo(e.target.value as typeof hashAlgo)} className="tool-textarea ml-2 rounded px-2 py-1">
            <option value="SHA-256">SHA-256</option>
            <option value="SHA-384">SHA-384</option>
            <option value="SHA-512">SHA-512</option>
          </select>
        </label>
      )}

      {tool.kind === "crypto-hmac" && (
        <Editor id="hmac-secret" label="Secret Key" value={hmacSecret} onChange={setHmacSecret} rows={2} placeholder="Enter secret (kept in memory only)" />
      )}

      {tool.kind === "uuid" && (
        <label className="text-sm">Count (1–100):
          <input type="number" min={1} max={100} value={uuidCount} onChange={(e) => setUuidCount(Number(e.target.value))} className="tool-textarea ml-2 w-20 rounded px-2 py-1" />
        </label>
      )}

      <ActionBar
        onPrimary={() => void run()}
        primaryLabel={primaryLabel}
        onSample={loadSample}
        onClear={() => { setInput(""); setInput2(""); setOutput(""); setError(""); setQrDataUrl(""); }}
        onSwap={tool.kind === "dual" ? () => { setInput(output); setOutput(input); setError(""); } : undefined}
        output={output}
        downloadFilename={tool.downloadFilename}
        downloadMime={tool.downloadMime}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {tool.kind === "regex" ? (
          <Editor id="tool-input" label="Test Text" value={input2} onChange={setInput2} rows={12} />
        ) : tool.kind !== "uuid" ? (
          <Editor id="tool-input" label="Input" value={input} onChange={setInput} rows={12} placeholder="Enter input..." />
        ) : null}

        {tool.kind !== "qr" && (
          <OutputPanel id="tool-output" label="Output" value={output} rows={12} />
        )}
      </div>

      {sizeMeta && <p className="text-xs text-[var(--muted)]">Size: {sizeMeta}</p>}
      <ErrorMessage message={error} />

      {colorPreview && (
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg border border-[var(--card-border)]" style={{ backgroundColor: colorPreview }} aria-label="Color preview" />
          <span className="text-sm text-[var(--muted)]">Preview: {colorPreview}</span>
        </div>
      )}

      {qrDataUrl && (
        <div className="flex flex-col items-start gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrDataUrl} alt="Generated QR code" width={256} height={256} className="rounded-lg border border-[var(--card-border)]" />
          <a href={qrDataUrl} download="qrcode.png" className="btn-secondary text-sm">Download PNG</a>
        </div>
      )}
    </div>
  );
}
