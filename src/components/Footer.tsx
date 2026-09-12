import Link from "next/link";
import { Logo } from "@/components/Logo";
import { SITE_NAME, getToolBySlug } from "@/data/tools";
import { POPULAR_TOOL_SLUGS } from "@/lib/seo";

const popularTools = POPULAR_TOOL_SLUGS.slice(0, 8)
  .map((slug) => getToolBySlug(slug))
  .filter(Boolean);

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-[var(--card-border)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-40" />
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <Logo size={32} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">{SITE_NAME}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                All tools run locally. Zero server-side processing.
              </p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {[
              { href: "/tools", label: "All tools" },
              { href: "/about", label: "About" },
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="nav-link hover:text-[var(--accent)]">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <nav aria-label="Popular tools">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">Popular tools</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {popularTools.map((tool) => (
              <li key={tool!.slug}>
                <Link href={`/tools/${tool!.slug}`} className="nav-link hover:text-[var(--accent)]">
                  {tool!.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
