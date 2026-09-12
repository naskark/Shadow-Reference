"use client";

import { useCallback, useEffect, useState } from "react";

export function ToolWorkbench({
  toolName,
  children,
}: {
  toolName: string;
  children: React.ReactNode;
}) {
  const [fullscreen, setFullscreen] = useState(false);

  const exit = useCallback(() => setFullscreen(false), []);
  const enter = useCallback(() => setFullscreen(true), []);

  useEffect(() => {
    if (!fullscreen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") exit();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("tool-fullscreen-active");
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("tool-fullscreen-active");
      window.removeEventListener("keydown", onKey);
    };
  }, [fullscreen, exit]);

  return (
    <section
      className={`tool-workbench glass-panel mb-6 rounded-2xl p-4 sm:p-6 ${
        fullscreen ? "tool-workbench-fullscreen" : ""
      }`}
      aria-label={`${toolName} workspace`}
      data-fullscreen={fullscreen ? "true" : "false"}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        {fullscreen ? (
          <p className="flex min-w-0 items-center gap-2">
            <span className="section-label mb-0">Workspace</span>
            <span className="truncate text-sm font-medium text-[var(--foreground)]">{toolName}</span>
          </p>
        ) : (
          <button
            type="button"
            onClick={enter}
            className="flex min-w-0 items-center gap-2 rounded-lg text-left transition hover:text-[var(--accent)]"
            aria-label={`Open ${toolName} in full screen`}
          >
            <span className="section-label mb-0">Workspace</span>
            <span className="truncate text-sm font-medium text-[var(--foreground)]">{toolName}</span>
            <span className="hidden font-mono text-[10px] uppercase tracking-wider text-[var(--muted)] sm:inline">
              click to expand
            </span>
          </button>
        )}
        <button
          type="button"
          className="btn-secondary shrink-0 px-3 py-1.5 text-xs"
          onClick={fullscreen ? exit : enter}
          aria-pressed={fullscreen}
        >
          {fullscreen ? "Exit full screen" : "Full screen"}
        </button>
      </div>
      <div className="tool-workbench-body">{children}</div>
    </section>
  );
}
