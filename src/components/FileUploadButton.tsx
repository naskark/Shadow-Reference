"use client";

import { useRef } from "react";
import { readTextFile, type ToolUploadConfig } from "@/lib/files";

export function FileUploadButton({
  config,
  onLoaded,
  onError,
}: {
  config: ToolUploadConfig;
  onLoaded: (text: string, name: string) => void;
  onError: (message: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const { text, name } = await readTextFile(file, config.extensions);
      onLoaded(text, name);
    } catch (error) {
      onError(error instanceof Error ? error.message : "Failed to read file.");
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn-secondary text-sm"
        onClick={() => inputRef.current?.click()}
        title="Read a local file in your browser. Nothing is uploaded to a server."
      >
        {config.label ?? "Upload file"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={config.accept}
        onChange={(event) => void onChange(event)}
        className="hidden"
        aria-label={config.label ?? "Upload file"}
      />
    </>
  );
}
