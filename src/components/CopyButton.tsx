"use client";

import { useState } from "react";
import { copyToClipboard } from "@/lib/utils";

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button type="button" onClick={handleCopy} disabled={!text} className="btn-secondary text-sm" aria-label={label}>
      {copied ? "Copied!" : label}
    </button>
  );
}
