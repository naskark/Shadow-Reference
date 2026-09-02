import { SITE_NAME, SITE_TAGLINE, TOOLS } from "@/data/tools";

export const metadata = {
  title: "About",
  description: `About ${SITE_NAME} — a privacy-friendly developer toolkit.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12">
      <p className="section-label mb-2">About</p>
      <h1 className="text-3xl font-bold sm:text-4xl">
        <span className="gradient-text">{SITE_NAME}</span>
      </h1>
      <div className="prose-tool mt-8 glass-panel rounded-2xl p-6 sm:p-8">
        <p className="!text-base !text-[var(--foreground)]">{SITE_TAGLINE}</p>
        <p>
          {SITE_NAME} is a collection of {TOOLS.length} practical browser-based utilities for developers.
          Every tool runs entirely in your browser — no backend, no database, no login required.
        </p>
        <h2>Our Principles</h2>
        <ul>
          <li>Your data stays on your device. Tool inputs are never sent to a server.</li>
          <li>Fast loading with minimal dependencies and route-based code splitting.</li>
          <li>Clear error messages and accessible, keyboard-friendly interfaces.</li>
          <li>Each tool is a useful, indexable page with examples and documentation.</li>
        </ul>
        <h2>For Developers</h2>
        <p>
          Tool logic lives in testable <code className="rounded bg-[var(--code-bg)] px-1.5 py-0.5 font-mono text-sm text-[var(--accent)]">src/lib/tools/</code> modules,
          separate from UI components. The tool registry in <code className="rounded bg-[var(--code-bg)] px-1.5 py-0.5 font-mono text-sm text-[var(--accent)]">src/data/tools.ts</code> drives
          routing, metadata, and related-tool links.
        </p>
      </div>
    </div>
  );
}
