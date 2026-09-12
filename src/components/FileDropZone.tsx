"use client";

import { useState } from "react";
import { readTextFile, type ToolUploadConfig } from "@/lib/files";

export function FileDropZone({
  config,
  onLoaded,
  onError,
  className,
  children,
}: {
  config: ToolUploadConfig;
  onLoaded: (text: string, name: string) => void;
  onError: (message: string) => void;
  className?: string;
  children: React.ReactNode;
}) {
  const [dragOver, setDragOver] = useState(false);

  const load = async (file?: File) => {
    if (!file) return;
    try {
      const { text, name } = await readTextFile(file, config.extensions);
      onLoaded(text, name);
    } catch (error) {
      onError(error instanceof Error ? error.message : "Failed to read file.");
    }
  };

  return (
    <div
      className={`relative ${className ?? ""}`}
      onDragOver={(event) => {
        event.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragOver(false);
        void load(event.dataTransfer.files[0]);
      }}
    >
      {children}
      {dragOver && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-xl border-2 border-dashed border-[var(--accent)] bg-[var(--background)]/85 text-sm font-medium text-[var(--accent)]">
          Drop {config.extensions[0]} file to load
        </div>
      )}
    </div>
  );
}
