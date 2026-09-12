import type { Metadata } from "next";
import { ToolSearch } from "@/components/ToolSearch";
import { AdSlot } from "@/components/AdSlot";
import { TOOLS, SITE_URL } from "@/data/tools";
import { absoluteTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: absoluteTitle("All Developer Tools — JSON Formatter, JWT Decoder & More") },
  description: `Browse ${TOOLS.length} free online developer tools: JSON formatter, JWT decoder, Base64 encoder, regex tester, UUID generator, SQL formatter, and more. Everything runs in your browser.`,
  alternates: { canonical: `${SITE_URL}/tools` },
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
      <p className="section-label mb-2">Directory</p>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        <span className="gradient-text">Free online developer tools</span>
      </h1>
      <p className="mt-3 max-w-2xl text-[var(--muted)]">
        {TOOLS.length} browser-based utilities — JSON formatter, JWT decoder, Base64 encoder, regex tester, and more.
        Pick one and start building. Everything runs on your machine.
      </p>
      <div className="mt-10">
        <ToolSearch />
      </div>
      <AdSlot />
    </div>
  );
}
