"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { DownloadButton } from "@/components/DownloadButton";
import { FileDropZone } from "@/components/FileDropZone";
import { FileUploadButton } from "@/components/FileUploadButton";
import {
  compareLines,
  formatUnifiedDiff,
  SAMPLE_ORIGINAL,
  SAMPLE_MODIFIED,
  type DiffLine,
} from "@/lib/tools/diff";
import { CODE_COMPARE_UPLOAD } from "@/lib/files";

type ViewMode = "side-by-side" | "unified";

function DiffSideBySide({ lines }: { lines: DiffLine[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--card-border)] font-mono text-sm">
      <div className="grid grid-cols-2 border-b border-[var(--card-border)] bg-[var(--code-bg)]">
        <div className="px-3 py-2 font-medium text-[var(--error)]">Original</div>
        <div className="border-l border-[var(--card-border)] px-3 py-2 font-medium text-[var(--success)]">Modified</div>
      </div>
      {lines.map((line, i) => (
        <div key={i} className="grid grid-cols-2 border-b border-[var(--card-border)]/50 last:border-0">
          <div className={`diff-line diff-line-${line.type === "add" ? "empty" : line.type} px-2 py-0.5`}>
            {line.type !== "add" && (
              <>
                <span className="diff-lnum">{line.oldLineNum ?? ""}</span>
                <span className="whitespace-pre-wrap break-all">{line.content || " "}</span>
              </>
            )}
          </div>
          <div className={`diff-line diff-line-${line.type === "remove" ? "empty" : line.type} border-l border-[var(--card-border)]/50 px-2 py-0.5`}>
            {line.type !== "remove" && (
              <>
                <span className="diff-lnum">{line.newLineNum ?? ""}</span>
                <span className="whitespace-pre-wrap break-all">{line.content || " "}</span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function DiffUnified({ lines }: { lines: DiffLine[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--card-border)] font-mono text-sm">
      {lines.map((line, i) => (
        <div key={i} className={`diff-line diff-line-${line.type} flex px-2 py-0.5`}>
          <span className="diff-lnum w-10 shrink-0 text-right">
            {line.type === "add" ? line.newLineNum : line.oldLineNum ?? ""}
          </span>
          <span className="mx-2 w-3 shrink-0">
            {line.type === "add" ? "+" : line.type === "remove" ? "-" : " "}
          </span>
          <span className="whitespace-pre-wrap break-all">{line.content || " "}</span>
        </div>
      ))}
    </div>
  );
}

export function CodeCompareTool() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("side-by-side");
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [originalName, setOriginalName] = useState("");
  const [modifiedName, setModifiedName] = useState("");
  const [uploadError, setUploadError] = useState("");

  const diff = useMemo(() => {
    const a = ignoreWhitespace ? original.split("\n").map((l) => l.trim()).join("\n") : original;
    const b = ignoreWhitespace ? modified.split("\n").map((l) => l.trim()).join("\n") : modified;
    return compareLines(a, b);
  }, [original, modified, ignoreWhitespace]);

  const unifiedText = formatUnifiedDiff(diff);
  const hasDiff = original !== modified || original.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => { setOriginal(SAMPLE_ORIGINAL); setModified(SAMPLE_MODIFIED); setOriginalName(""); setModifiedName(""); setUploadError(""); }}
          className="btn-secondary text-sm"
        >
          Load Sample
        </button>
        <button
          type="button"
          onClick={() => { setOriginal(""); setModified(""); setOriginalName(""); setModifiedName(""); setUploadError(""); }}
          className="btn-secondary text-sm"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={() => { setOriginal(modified); setModified(original); }}
          className="btn-secondary text-sm"
        >
          Swap
        </button>
        <CopyButton text={unifiedText} label="Copy Diff" />
        <DownloadButton text={unifiedText} filename="diff.patch" label="Download Diff" />

        <label className="flex items-center gap-2 text-sm text-[var(--muted)]">
          <input
            type="checkbox"
            checked={ignoreWhitespace}
            onChange={(e) => setIgnoreWhitespace(e.target.checked)}
          />
          Ignore whitespace
        </label>

        <div className="ml-auto flex gap-1 rounded-lg border border-[var(--card-border)] p-0.5">
          {(["side-by-side", "unified"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setViewMode(mode)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                viewMode === mode ? "bg-[var(--accent)] text-white" : "text-[var(--muted)]"
              }`}
            >
              {mode === "side-by-side" ? "Side by Side" : "Unified"}
            </button>
          ))}
        </div>
      </div>

      {uploadError && (
        <p role="alert" className="text-sm text-[var(--error)]">{uploadError}</p>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <FileDropZone
          config={CODE_COMPARE_UPLOAD}
          onLoaded={(text, name) => { setOriginal(text); setOriginalName(name); setUploadError(""); }}
          onError={setUploadError}
        >
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <label htmlFor="code-original" className="text-sm font-medium">Original {originalName && <span className="font-mono text-xs text-[var(--accent)]">({originalName})</span>}</label>
            <FileUploadButton
              config={{ ...CODE_COMPARE_UPLOAD, label: "Upload original" }}
              onLoaded={(text, name) => { setOriginal(text); setOriginalName(name); setUploadError(""); }}
              onError={setUploadError}
            />
          </div>
          <textarea
            id="code-original"
            value={original}
            onChange={(e) => { setOriginal(e.target.value); setOriginalName(""); }}
            rows={14}
            spellCheck={false}
            placeholder="Paste original code or drop a file..."
            className="tool-textarea w-full resize-y rounded-xl px-4 py-3 text-base leading-relaxed"
          />
        </FileDropZone>
        <FileDropZone
          config={CODE_COMPARE_UPLOAD}
          onLoaded={(text, name) => { setModified(text); setModifiedName(name); setUploadError(""); }}
          onError={setUploadError}
        >
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <label htmlFor="code-modified" className="text-sm font-medium">Modified {modifiedName && <span className="font-mono text-xs text-[var(--accent)]">({modifiedName})</span>}</label>
            <FileUploadButton
              config={{ ...CODE_COMPARE_UPLOAD, label: "Upload modified" }}
              onLoaded={(text, name) => { setModified(text); setModifiedName(name); setUploadError(""); }}
              onError={setUploadError}
            />
          </div>
          <textarea
            id="code-modified"
            value={modified}
            onChange={(e) => { setModified(e.target.value); setModifiedName(""); }}
            rows={14}
            spellCheck={false}
            placeholder="Paste modified code or drop a file..."
            className="tool-textarea w-full resize-y rounded-xl px-4 py-3 text-base leading-relaxed"
          />
        </FileDropZone>
      </div>

      {hasDiff && (
        <div className="flex flex-wrap gap-4 font-mono text-xs">
          <span className="text-[var(--success)]">+{diff.stats.added} added</span>
          <span className="text-[var(--error)]">−{diff.stats.removed} removed</span>
          <span className="text-[var(--muted)]">{diff.stats.unchanged} unchanged</span>
          {diff.stats.added === 0 && diff.stats.removed === 0 && original.length > 0 && (
            <span className="text-[var(--accent)]">No differences</span>
          )}
        </div>
      )}

      {hasDiff && (diff.stats.added > 0 || diff.stats.removed > 0) && (
        viewMode === "side-by-side" ? <DiffSideBySide lines={diff.lines} /> : <DiffUnified lines={diff.lines} />
      )}
    </div>
  );
}
