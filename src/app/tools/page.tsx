import { ToolSearch } from "@/components/ToolSearch";
import { TOOLS } from "@/data/tools";

export const metadata = {
  title: "All Developer Tools",
  description: "Browse all browser-based developer tools — JSON, encoding, regex, crypto, and more.",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
      <p className="section-label mb-2">Directory</p>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        <span className="gradient-text">All Tools</span>
      </h1>
      <p className="mt-3 max-w-xl text-[var(--muted)]">
        {TOOLS.length} browser-based utilities. Pick one and start building — everything runs on your machine.
      </p>
      <div className="mt-10">
        <ToolSearch />
      </div>
    </div>
  );
}
