import type { FAQ as FAQType } from "@/data/tools";

export function FAQ({ items }: { items: FAQType[] }) {
  return (
    <section className="prose-tool">
      <p className="section-label mb-2">FAQ</p>
      <h2>Frequently Asked Questions</h2>
      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border border-[var(--card-border)] bg-[var(--code-bg)]/50 open:border-[var(--accent)]/30"
          >
            <summary className="cursor-pointer px-4 py-3 font-medium transition hover:text-[var(--accent)]">
              {item.question}
            </summary>
            <p className="border-t border-[var(--card-border)] px-4 py-3 text-sm">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
