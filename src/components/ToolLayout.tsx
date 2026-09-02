import { ToolHeader } from "@/components/ToolHeader";
import { ToolTutorial } from "@/components/ToolTutorial";
import { FAQ } from "@/components/FAQ";
import { RelatedTools } from "@/components/RelatedTools";
import type { ToolDefinition } from "@/data/tools";
import { getRelatedTools } from "@/data/tools";

export function ToolLayout({
  tool,
  children,
}: {
  tool: ToolDefinition;
  children: React.ReactNode;
}) {
  const related = getRelatedTools(tool.slug);

  return (
    <article className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <ToolHeader tool={tool} />
      <ToolTutorial tool={tool} />

      <section className="glass-panel mb-12 rounded-2xl p-5 sm:p-7">
        {children}
      </section>

      <div className="prose-tool space-y-10">
        <section className="glass-panel rounded-2xl p-6 sm:p-8">
          <h2>What This Tool Does</h2>
          <p>{tool.description}</p>
        </section>

        <section className="glass-panel rounded-2xl p-6 sm:p-8">
          <h2>Limitations</h2>
          <ul>
            {tool.limitations.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </section>

        <section className="glass-panel rounded-2xl p-6 sm:p-8">
          <h2>Example</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 font-mono text-xs uppercase tracking-wider text-[var(--accent)]">Input</h3>
              <pre className="code-block">{tool.exampleInput}</pre>
            </div>
            <div>
              <h3 className="mb-2 font-mono text-xs uppercase tracking-wider text-[var(--accent-secondary)]">Output</h3>
              <pre className="code-block">{tool.exampleOutput}</pre>
            </div>
          </div>
        </section>

        <div className="glass-panel rounded-2xl p-6 sm:p-8">
          <FAQ items={tool.faqs} />
        </div>

        <div className="glass-panel rounded-2xl p-6 sm:p-8">
          <RelatedTools tools={related} />
        </div>
      </div>
    </article>
  );
}
