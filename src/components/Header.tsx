"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { Logo } from "@/components/Logo";
import { SITE_NAME } from "@/data/tools";

export function Header() {
  const { theme, toggle } = useTheme();
  const pathname = usePathname();

  const links = [
    { href: "/tools", label: "Tools" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="site-header sticky top-0 z-50 border-b border-[var(--card-border)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
        <Link href="/" className="group flex items-center gap-3">
          <Logo
            size={36}
            className="shrink-0 rounded-lg shadow-[0_0_20px_var(--accent-glow)] transition group-hover:shadow-[0_0_28px_var(--accent-glow)]"
          />
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight">{SITE_NAME}</span>
            <span className="hidden font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] sm:block">
              dev toolkit
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-1.5 nav-link ${pathname.startsWith(link.href) ? "nav-link-active bg-[var(--code-bg)]" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={toggle}
            className="btn-secondary ml-1 flex items-center gap-1.5 px-3 py-1.5"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            <span className="text-base leading-none">{theme === "light" ? "◐" : "◑"}</span>
            <span className="hidden text-xs sm:inline">{theme === "light" ? "Dark" : "Light"}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
