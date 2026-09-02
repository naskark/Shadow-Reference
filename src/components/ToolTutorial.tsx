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

function truncateSample(text: string, max = 320): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max)}…`;
}

function getTutorialSamples(tool: ToolDefinition) {
  const input = (tool.sampleInput || tool.exampleInput).trim();
  const output = tool.exampleOutput.trim();
  return {
    input: input || "Paste or type your input here…",
    output: output || "Result appears here after you run the tool.",
  };
}

type IoPhase = "input" | "process" | "output";

function getIoPhase(activeStep: number, totalSteps: number): IoPhase {
  if (totalSteps <= 1) return "output";
  if (activeStep === 0) return "input";
  if (activeStep >= totalSteps - 1) return "output";
  return "process";
}

export function ToolTutorial({ tool }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [mounted, setMounted] = useState(false);
  const lottieRef = useRef<LottieHandle>(null);

  const animationData = useMemo(() => getTutorialAnimation(tool.kind), [tool.kind]);
  const samples = useMemo(() => getTutorialSamples(tool), [tool]);
  const stepDuration = TUTORIAL_LOOP_MS / Math.max(tool.howToUse.length, 1);
  const ioPhase = getIoPhase(activeStep, tool.howToUse.length);

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
    <section className="glass-panel mb-8 overflow-hidden rounded-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--card-border)] px-5 py-4 sm:px-6">
        <div>
          <p className="section-label mb-1">Tutorial</p>
          <h2 className="text-base font-semibold">How to use {tool.name}</h2>
          <p className="mt-1 text-xs text-[var(--muted)]">Watch the flow with sample input and output</p>
        </div>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="btn-secondary px-3 py-1.5 text-xs"
          aria-label={playing ? "Pause tutorial" : "Play tutorial"}
        >
          {playing ? "⏸ Pause" : "▶ Play"}
        </button>
      </div>

      {/* Sample I/O + Lottie demo */}
      <div className="grid gap-4 border-b border-[var(--card-border)] p-5 lg:grid-cols-[1fr_auto_1fr] lg:p-6">
        <div
          className={`tutorial-io rounded-xl border p-4 transition-all duration-500 ${
            ioPhase === "input"
              ? "tutorial-io-active border-[var(--accent)] bg-[var(--accent-glow)]"
              : "border-[var(--card-border)] bg-[var(--code-bg)]/40 opacity-70"
          }`}
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">Sample Input</span>
            {ioPhase === "input" && <span className="status-dot" aria-hidden="true" />}
          </div>
          <pre className="max-h-36 overflow-auto font-mono text-xs leading-relaxed whitespace-pre-wrap break-all text-[var(--foreground)]">
            {truncateSample(samples.input)}
          </pre>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 px-2">
          <div className="tutorial-lottie flex h-36 w-full min-w-[140px] items-center justify-center rounded-xl border border-[var(--card-border)] bg-[var(--code-bg)]/30 sm:h-44 sm:min-w-[180px]">
            {mounted ? (
              <Lottie
                lottieRef={lottieRef}
                src={animationData}
                loop
                autoplay={playing}
                className="h-full w-full"
              />
            ) : (
              <span className="font-mono text-[10px] text-[var(--muted)]">Loading…</span>
            )}
          </div>
          <span
            className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider transition ${
              ioPhase === "process"
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--code-bg)] text-[var(--muted)]"
            }`}
          >
            {ioPhase === "input" ? "1. Input" : ioPhase === "process" ? "2. Run" : "3. Output"}
          </span>
        </div>

        <div
          className={`tutorial-io rounded-xl border p-4 transition-all duration-500 ${
            ioPhase === "output"
              ? "tutorial-io-active border-[var(--accent-secondary)] bg-[var(--orb-2)]"
              : "border-[var(--card-border)] bg-[var(--code-bg)]/40 opacity-70"
          }`}
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent-secondary)]">Sample Output</span>
            {ioPhase === "output" && <span className="status-dot" aria-hidden="true" />}
          </div>
          <pre className="max-h-36 overflow-auto font-mono text-xs leading-relaxed whitespace-pre-wrap break-all text-[var(--foreground)]">
            {truncateSample(samples.output)}
          </pre>
        </div>
      </div>

      {/* Steps */}
      <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3 sm:p-6">
        {tool.howToUse.map((step, i) => (
          <div
            key={step}
            className={`tutorial-step flex gap-3 rounded-xl border px-4 py-3 transition-all duration-300 ${
              i === activeStep
                ? "border-[var(--accent)] bg-[var(--accent-glow)] shadow-[0_0_20px_var(--accent-glow)]"
                : "border-[var(--card-border)] bg-transparent opacity-60"
            }`}
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold ${
                i === activeStep
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--code-bg)] text-[var(--muted)]"
              }`}
            >
              {i + 1}
            </span>
            <p className={`text-sm leading-relaxed ${i === activeStep ? "text-[var(--foreground)]" : "text-[var(--muted)]"}`}>
              {step}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
