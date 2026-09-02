"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TOOLS, CATEGORIES, type ToolCategory } from "@/data/tools";

export function ToolSearch({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ToolCategory | "All">("All");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return TOOLS.filter((t) => {
      const matchCat = category === "All" || t.category === category;
      const matchQ =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.slug.includes(q) ||
        t.category.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, category]);

  return (
    <div className="space-y-5">
      <div className={`flex flex-col gap-3 ${compact ? "" : "sm:flex-row"}`}>
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-sm text-[var(--muted)]">
            /
          </span>
          <input
            type="search"
            placeholder="Search tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="tool-textarea w-full rounded-xl py-3 pl-9 pr-4 text-sm"
            aria-label="Search tools"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as ToolCategory | "All")}
          className="tool-textarea rounded-xl px-4 py-3 text-sm sm:min-w-[180px]"
          aria-label="Filter by category"
        >
          <option value="All">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {!compact && (
        <>
          <p className="font-mono text-xs text-[var(--muted)]">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t) => (
              <Link key={t.slug} href={`/tools/${t.slug}`} className="tool-card group">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">
                    {t.category}
                  </span>
                  <span className="text-[var(--muted)] transition group-hover:text-[var(--accent)]">→</span>
                </div>
                <h3 className="font-semibold group-hover:text-[var(--accent)]">{t.name}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{t.tagline}</p>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="rounded-xl border border-dashed border-[var(--card-border)] py-12 text-center text-[var(--muted)]">
              No tools match your search.
            </p>
          )}
        </>
      )}

      {compact && query && (
        <ul className="glass-panel overflow-hidden rounded-xl">
          {filtered.slice(0, 8).map((t) => (
            <li key={t.slug} className="border-b border-[var(--card-border)] last:border-0">
              <Link href={`/tools/${t.slug}`} className="block px-4 py-3 text-sm transition hover:bg-[var(--code-bg)]">
                <span className="font-medium">{t.name}</span>
                <span className="text-[var(--muted)]"> — {t.category}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
