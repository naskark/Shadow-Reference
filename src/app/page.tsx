import type { Metadata } from "next";
import Link from "next/link";
import { ToolSearch } from "@/components/ToolSearch";
import { Logo } from "@/components/Logo";
import { AdSlot } from "@/components/AdSlot";
import { TOOLS, SITE_NAME, SITE_URL, CATEGORIES, getToolBySlug } from "@/data/tools";
import { SITE_DESCRIPTION, POPULAR_TOOL_SLUGS, absoluteTitle } from "@/lib/seo";

const FEATURED = TOOLS.slice(0, 6);
const popularTools = POPULAR_TOOL_SLUGS.map((slug) => getToolBySlug(slug)).filter(Boolean) as typeof TOOLS;

export const metadata: Metadata = {
  title: { absolute: absoluteTitle("Free Online Developer Tools — JSON Formatter, JWT Decoder & More") },
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:pt-12">
      <section className="relative mb-16 overflow-hidden rounded-2xl border border-[var(--card-border)] glass-panel px-6 py-12 sm:px-10 sm:py-16">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--accent-glow)] blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[var(--orb-2)] blur-3xl" aria-hidden="true" />

        <div className="relative">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <Logo size={44} className="rounded-xl shadow-[0_0_24px_var(--accent-glow)]" />
            <span className="badge badge-accent">
              <span className="status-dot" />
              All systems local
            </span>
            <span className="badge">{TOOLS.length} tools</span>
            <span className="badge font-mono">v1.0</span>
          </div>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="gradient-text">{SITE_NAME}</span>
            <span className="mt-3 block text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl lg:text-4xl">
              Free online JSON formatter, JWT decoder &amp; developer tools
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--muted)] sm:text-xl">
            Beautify JSON, decode tokens, encode Base64, test regex, generate UUIDs, and more — entirely in your browser.
          </p>
          <p className="mt-3 max-w-xl font-mono text-sm text-[var(--muted)]">
            <span className="text-[var(--accent)]">$</span> no login · no uploads · no server calls
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/tools" className="btn-primary">
              Explore Tools →
            </Link>
            <Link href="/tools/json-formatter" className="btn-secondary">
              Try JSON Formatter
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <p className="section-label mb-2">Popular searches</p>
        <h2 className="section-title mb-6">Jump to a tool</h2>
        <ul className="flex flex-wrap gap-2">
          {popularTools.map((tool) => (
            <li key={tool.slug}>
              <Link
                href={`/tools/${tool.slug}`}
                className="group inline-flex rounded-full border border-[var(--card-border)] bg-[var(--card)] px-4 py-2 text-sm backdrop-blur transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {tool.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-16">
        <p className="section-label mb-2">Search</p>
        <h2 className="section-title mb-6">Find the right tool</h2>
        <ToolSearch />
      </section>

      <section className="mb-16">
        <p className="section-label mb-2">Browse</p>
        <h2 className="section-title mb-6">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const count = TOOLS.filter((t) => t.category === cat).length;
            return (
              <Link
                key={cat}
                href={`/tools?category=${encodeURIComponent(cat)}`}
                className="group rounded-full border border-[var(--card-border)] bg-[var(--card)] px-4 py-2 text-sm backdrop-blur transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <span className="font-medium">{cat}</span>
                <span className="ml-1.5 font-mono text-xs text-[var(--muted)] group-hover:text-[var(--accent)]">
                  {count}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="section-label mb-2">Popular</p>
            <h2 className="section-title">Featured Tools</h2>
          </div>
          <Link href="/tools" className="nav-link text-sm text-[var(--accent)] hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((t) => (
            <Link key={t.slug} href={`/tools/${t.slug}`} className="tool-card group">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">
                  {t.category}
                </span>
                <span className="text-[var(--muted)] transition group-hover:translate-x-0.5 group-hover:text-[var(--accent)]">
                  →
                </span>
              </div>
              <h3 className="font-semibold tracking-tight">{t.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{t.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <AdSlot />
    </div>
  );
}
