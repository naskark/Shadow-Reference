"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import type { LottieHandle } from "lottie-react";
import type { ToolDefinition } from "@/data/tools";
import { getTutorialAnimation, TUTORIAL_LOOP_MS } from "@/lib/animations/tutorial-lotties";

const Lottie = dynamic(
  () => import("lottie-react").then((mod) => mod.Lottie),
  { ssr: false }
);

type Props = { tool: ToolDefinition };

export function ToolTutorial({ tool }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [mounted, setMounted] = useState(false);
  const lottieRef = useRef<LottieHandle>(null);

  const animationData = useMemo(() => getTutorialAnimation(tool.kind), [tool.kind]);
  const stepDuration = TUTORIAL_LOOP_MS / Math.max(tool.howToUse.length, 1);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!playing) {
      lottieRef.current?.pause();
      return;
    }
    lottieRef.current?.play();
    const interval = setInterval(() => {
      setActiveStep((s) => (s + 1) % tool.howToUse.length);
    }, stepDuration);
    return () => clearInterval(interval);
  }, [playing, tool.howToUse.length, stepDuration]);

  return (
    <section className="glass-panel mb-10 overflow-hidden rounded-xl">
      <div className="flex items-center gap-3 px-3 py-2 sm:px-4">
        <div className="tutorial-lottie flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--card-border)] bg-[var(--code-bg)]/40">
          {mounted ? (
            <Lottie
              lottieRef={lottieRef}
              src={animationData}
              loop
              autoplay={playing}
              className="h-full w-full"
            />
          ) : (
            <span className="font-mono text-[9px] text-[var(--muted)]">…</span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="section-label mb-0">Quick tutorial</p>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="btn-secondary px-2 py-1 text-[10px]"
              aria-label={playing ? "Pause tutorial" : "Play tutorial"}
            >
              {playing ? "Pause" : "Play"}
            </button>
          </div>
          <ol className="mt-1.5 flex gap-1.5 overflow-x-auto pb-0.5">
            {tool.howToUse.map((step, i) => (
              <li
                key={step}
                className={`flex max-w-[220px] shrink-0 items-center gap-1.5 rounded-full border px-2 py-1 text-[11px] leading-tight transition ${
                  i === activeStep
                    ? "border-[var(--accent)] bg-[var(--accent-glow)] text-[var(--foreground)]"
                    : "border-[var(--card-border)] text-[var(--muted)]"
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full font-mono text-[9px] font-bold ${
                    i === activeStep ? "bg-[var(--accent)] text-white" : "bg-[var(--code-bg)]"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="truncate">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
