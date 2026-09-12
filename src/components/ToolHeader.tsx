import Link from "next/link";
import type { ToolDefinition } from "@/data/tools";

export function ToolHeader({ tool }: { tool: ToolDefinition }) {
  return (
    <div className="mb-5">
      <nav aria-label="Breadcrumb" className="mb-4 font-mono text-xs text-[var(--muted)]">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/" className="transition hover:text-[var(--accent)]">Home</Link></li>
          <li aria-hidden="true" className="text-[var(--card-border)]">/</li>
          <li><Link href="/tools" className="transition hover:text-[var(--accent)]">Tools</Link></li>
          <li aria-hidden="true" className="text-[var(--card-border)]">/</li>
          <li><span className="text-[var(--accent)]">{tool.name}</span></li>
        </ol>
      </nav>

      <div className="flex flex-wrap items-start gap-3">
        <span className="badge badge-accent font-mono">{tool.category}</span>
      </div>

      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        <span className="gradient-text">{tool.name}</span>
      </h1>
      <p className="mt-2 font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
        Free online tool · runs in your browser
      </p>
      <p className="mt-3 max-w-2xl text-lg text-[var(--muted)]">{tool.tagline}</p>

      {tool.privacyNote && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--code-bg)] px-4 py-3 text-xs text-[var(--muted)]">
          <span className="text-[var(--accent)]" aria-hidden="true">◆</span>
          {tool.privacyNote}
        </div>
      )}
    </div>
  );
}
