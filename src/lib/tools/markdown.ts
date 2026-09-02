export type MarkdownStats = {
  lines: number;
  words: number;
  characters: number;
};

export function getMarkdownStats(content: string): MarkdownStats {
  const trimmed = content.trim();
  return {
    lines: trimmed ? content.split(/\r?\n/).length : 0,
    words: trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0,
    characters: content.length,
  };
}

export async function renderMarkdown(content: string): Promise<string> {
  const { marked } = await import("marked");
  const DOMPurify = (await import("isomorphic-dompurify")).default;
  const raw = await marked.parse(content || "");
  return DOMPurify.sanitize(typeof raw === "string" ? raw : "");
}

export const SAMPLE_MD = `# README.md

Welcome to **ShadowReference** — a developer toolkit.

## Features

- Open \`.md\` files locally
- Live rendered preview
- No server uploads

## Code Example

\`\`\`js
console.log("Hello, developer!");
\`\`\`

> Your files never leave the browser.`;

export function isMarkdownFilename(name: string): boolean {
  return /\.(md|markdown|txt)$/i.test(name);
}

export const MAX_MD_FILE_BYTES = 2 * 1024 * 1024; // 2 MB
