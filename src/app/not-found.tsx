import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="font-mono text-sm text-[var(--accent)]">404_NOT_FOUND</p>
      <h1 className="mt-2 text-5xl font-bold tracking-tight">
        <span className="gradient-text">Lost in the stack</span>
      </h1>
      <p className="mt-4 text-[var(--muted)]">This page or tool doesn&apos;t exist.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn-primary text-sm">Go Home</Link>
        <Link href="/tools" className="btn-secondary text-sm">Browse Tools</Link>
      </div>
    </div>
  );
}
