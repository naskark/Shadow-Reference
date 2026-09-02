"use client";

import { downloadText } from "@/lib/utils";

export function DownloadButton({
  text,
  filename,
  mime = "text/plain",
  label = "Download",
}: {
  text: string;
  filename: string;
  mime?: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => downloadText(text, filename, mime)}
      disabled={!text}
      className="btn-secondary text-sm"
      aria-label={label}
    >
      {label}
    </button>
  );
}
