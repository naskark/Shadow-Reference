import Link from "next/link";
import type { ToolDefinition } from "@/data/tools";

export function RelatedTools({ tools }: { tools: ToolDefinition[] }) {
  if (tools.length === 0) return null;
  return (
    <section className="prose-tool">
      <p className="section-label mb-2">Related</p>
      <h2>Related Tools</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {tools.map((t) => (
          <li key={t.slug}>
            <Link
              href={`/tools/${t.slug}`}
              className="tool-card flex items-center justify-between !p-4"
            >
              <div>
                <span className="font-medium">{t.name}</span>
                <p className="mt-0.5 text-xs text-[var(--muted)]">{t.tagline}</p>
              </div>
              <span className="text-[var(--accent)]">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
