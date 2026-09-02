import Link from "next/link";
import { SITE_NAME } from "@/data/tools";

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-[var(--card-border)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-40" />
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">{SITE_NAME}</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            All tools run locally. Zero server-side processing.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {[
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
    </footer>
  );
}
