export function ErrorMessage({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="flex items-start gap-2 rounded-xl border border-[var(--error)]/30 bg-[var(--error)]/8 px-4 py-3 text-sm text-[var(--error)] backdrop-blur"
    >
      <span className="font-mono text-xs" aria-hidden="true">err</span>
      {message}
    </div>
  );
}
