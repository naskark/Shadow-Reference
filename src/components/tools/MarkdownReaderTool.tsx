"use client";

import { useCallback, useEffect, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { DownloadButton } from "@/components/DownloadButton";
import { FileDropZone } from "@/components/FileDropZone";
import { FileUploadButton } from "@/components/FileUploadButton";
import {
  getMarkdownStats,
  renderMarkdown,
  SAMPLE_MD,
} from "@/lib/tools/markdown";
import { TOOL_UPLOADS } from "@/lib/files";

type ViewMode = "split" | "preview" | "source";

const uploadConfig = TOOL_UPLOADS["markdown-reader"]!;

export function MarkdownReaderTool() {
  const [content, setContent] = useState("");
  const [filename, setFilename] = useState("");
  const [html, setHtml] = useState("");
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("split");

  const stats = getMarkdownStats(content);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const rendered = await renderMarkdown(content);
        if (!cancelled) setHtml(rendered);
      } catch {
        if (!cancelled) setHtml("");
      }
    })();
    return () => { cancelled = true; };
  }, [content]);

  const onLoaded = useCallback((text: string, name: string) => {
    setError("");
    setContent(text);
    setFilename(name);
  }, []);

  return (
    <div className="space-y-4">
      <FileDropZone config={uploadConfig} onLoaded={onLoaded} onError={setError}>
        <div className="rounded-xl border-2 border-dashed border-[var(--card-border)] px-6 py-6 text-center">
          <p className="font-mono text-sm text-[var(--muted)]">
            Drop a <span className="text-[var(--accent)]">.md</span> file here or
          </p>
          <div className="mt-3 flex justify-center">
            <FileUploadButton config={{ ...uploadConfig, label: "Choose File" }} onLoaded={onLoaded} onError={setError} />
          </div>
          {filename && (
            <p className="mt-3 font-mono text-xs text-[var(--accent)]">{filename} loaded locally</p>
          )}
        </div>
      </FileDropZone>

      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => { setContent(SAMPLE_MD); setFilename(""); }} className="btn-secondary text-sm">
          Sample .md
        </button>
        <button type="button" onClick={() => { setContent(""); setFilename(""); setError(""); }} className="btn-secondary text-sm">
          Clear
        </button>
        <CopyButton text={content} label="Copy Source" />
        {content && <DownloadButton text={content} filename={filename || "document.md"} mime="text/markdown" label="Download" />}
        <div className="ml-auto flex gap-1 rounded-lg border border-[var(--card-border)] p-0.5">
          {(["split", "preview", "source"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setViewMode(mode)}
              className={`rounded-md px-3 py-1 text-xs font-medium capitalize transition ${
                viewMode === mode ? "bg-[var(--accent)] text-white" : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {content && (
        <div className="flex flex-wrap gap-3 font-mono text-xs text-[var(--muted)]">
          <span>{stats.lines} lines</span>
          <span>{stats.words} words</span>
          <span>{stats.characters} chars</span>
        </div>
      )}

      {error && (
        <p role="alert" className="text-sm text-[var(--error)]">{error}</p>
      )}

      <div className={`grid gap-4 ${viewMode === "split" ? "lg:grid-cols-2" : ""}`}>
        {(viewMode === "split" || viewMode === "source") && (
          <div>
            <label htmlFor="md-source" className="mb-1.5 block text-sm font-medium">Markdown Source</label>
            <textarea
              id="md-source"
              value={content}
              onChange={(e) => { setContent(e.target.value); setFilename(""); }}
              rows={18}
              spellCheck={false}
              placeholder="Paste markdown or upload a .md file..."
              className="tool-textarea w-full resize-y rounded-xl px-4 py-3 text-base leading-relaxed"
            />
          </div>
        )}
        {(viewMode === "split" || viewMode === "preview") && (
          <div>
            <p className="mb-1.5 text-sm font-medium">Rendered Preview</p>
            <div
              className="markdown-preview min-h-[360px] rounded-xl border border-[var(--card-border)] bg-[var(--input-bg)] p-5 text-base"
              dangerouslySetInnerHTML={{ __html: html || "<p class='text-[var(--muted)]'>Nothing to preview yet.</p>" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
