import { ToolHeader } from "@/components/ToolHeader";
import { ToolTutorial } from "@/components/ToolTutorial";
import { ToolWorkbench } from "@/components/ToolWorkbench";
import { FAQ } from "@/components/FAQ";
import { RelatedTools } from "@/components/RelatedTools";
import { AdSlot } from "@/components/AdSlot";
import type { ToolDefinition } from "@/data/tools";
import { getRelatedTools } from "@/data/tools";
import { getToolSeo } from "@/lib/seo";

export function ToolLayout({
  tool,
  children,
}: {
  tool: ToolDefinition;
  children: React.ReactNode;
}) {
  const related = getRelatedTools(tool.slug);
  const seo = getToolSeo(tool);

  return (
    <article className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
      <ToolHeader tool={tool} />

      <ToolWorkbench toolName={tool.name}>{children}</ToolWorkbench>
      <ToolTutorial tool={tool} />

      <div className="prose-tool space-y-10">
        <section className="glass-panel rounded-2xl p-6 sm:p-8">
          <h2>Free online {tool.name.toLowerCase()}</h2>
          <p>{seo.intro}</p>
        </section>

        <section className="glass-panel rounded-2xl p-6 sm:p-8">
          <h2>How to use {tool.name}</h2>
          <ol>
            {tool.howToUse.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
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
          <FAQ items={seo.faqs} />
        </div>

        <AdSlot format="rectangle" />

        <div className="glass-panel rounded-2xl p-6 sm:p-8">
          <RelatedTools tools={related} />
        </div>

        <AdSlot />
      </div>
    </article>
  );
}
