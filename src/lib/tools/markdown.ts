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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const LANG_ALIASES: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  jsx: "javascript",
  tsx: "typescript",
  html: "xml",
  htm: "xml",
  yml: "yaml",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  py: "python",
  rb: "ruby",
  rs: "rust",
  md: "markdown",
  plaintext: "plaintext",
  text: "plaintext",
};

let markedReady: Promise<typeof import("marked").marked> | null = null;

async function getMarked() {
  if (!markedReady) {
    markedReady = (async () => {
      const [{ marked }, hljsMod] = await Promise.all([
        import("marked"),
        import("highlight.js/lib/common"),
      ]);
      const hljs = hljsMod.default;

      marked.use({
        gfm: true,
        breaks: false,
        renderer: {
          code({ text, lang }) {
            const requested = (lang ?? "").trim().split(/\s+/)[0]?.toLowerCase() ?? "";
            const language = LANG_ALIASES[requested] ?? requested;
            const canHighlight = Boolean(language && hljs.getLanguage(language));

            let body: string;
            try {
              body = canHighlight
                ? hljs.highlight(text, { language, ignoreIllegals: true }).value
                : escapeHtml(text);
            } catch {
              body = escapeHtml(text);
            }

            const className = canHighlight ? `hljs language-${language}` : "hljs";
            return `<pre><code class="${className}">${body}</code></pre>\n`;
          },
        },
      });

      return marked;
    })();
  }
  return markedReady;
}

export async function renderMarkdown(content: string): Promise<string> {
  const marked = await getMarked();
  const DOMPurify = (await import("isomorphic-dompurify")).default;
  const raw = await marked.parse(content || "");
  return DOMPurify.sanitize(typeof raw === "string" ? raw : "", {
    ADD_ATTR: ["class", "checked", "disabled"],
  });
}

export const SAMPLE_MD = `# README.md

Welcome to **ShadowReference** — a developer toolkit.

## Features

- Open \`.md\` files locally
- Live rendered preview with syntax highlighting
- Tables, quotes, and task lists
- No server uploads

## Code Example

\`\`\`js
function greet(name) {
  const message = \`Hello, \${name}!\`;
  console.log(message);
  return message;
}

greet("developer");
\`\`\`

\`\`\`json
{
  "private": true,
  "scripts": { "dev": "next dev" }
}
\`\`\`

## Checklist

- [x] Render headings and lists
- [x] Highlight fenced code
- [ ] Optional mermaid diagrams

| Tool | Runs in |
| --- | --- |
| Markdown Previewer | Browser |
| Markdown Reader | Browser |

> Your files never leave the browser.
`;

export function isMarkdownFilename(name: string): boolean {
  return /\.(md|markdown|txt)$/i.test(name);
}

export const MAX_MD_FILE_BYTES = 2 * 1024 * 1024; // 2 MB
