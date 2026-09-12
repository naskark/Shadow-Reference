import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolLayout } from "@/components/ToolLayout";
import { ToolWorkspace } from "@/components/ToolWorkspace";
import { JsonLd } from "@/components/JsonLd";
import { TOOLS, getToolBySlug } from "@/data/tools";
import { buildToolJsonLd, buildToolMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "Tool Not Found" };
  return buildToolMetadata(tool);
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  return (
    <>
      <JsonLd data={buildToolJsonLd(tool)} />
      <ToolLayout tool={tool}>
        <ToolWorkspace tool={tool} />
      </ToolLayout>
    </>
  );
}
