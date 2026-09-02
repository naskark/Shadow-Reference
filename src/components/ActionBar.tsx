"use client";

import { CopyButton } from "@/components/CopyButton";
import { DownloadButton } from "@/components/DownloadButton";

export function ActionBar({
  onPrimary,
  primaryLabel,
  onClear,
  onSwap,
  onSample,
  output,
  downloadFilename,
  downloadMime,
  extra,
}: {
  onPrimary: () => void;
  primaryLabel: string;
  onClear?: () => void;
  onSwap?: () => void;
  onSample?: () => void;
  output?: string;
  downloadFilename?: string;
  downloadMime?: string;
  extra?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={onPrimary} className="btn-primary text-sm">
        {primaryLabel}
      </button>
      {onSample && (
        <button type="button" onClick={onSample} className="btn-secondary text-sm">
          Sample Input
        </button>
      )}
      {onClear && (
        <button type="button" onClick={onClear} className="btn-secondary text-sm">
          Clear
        </button>
      )}
      {onSwap && (
        <button type="button" onClick={onSwap} className="btn-secondary text-sm">
          Swap
        </button>
      )}
      {output !== undefined && <CopyButton text={output} />}
      {output && downloadFilename && (
        <DownloadButton text={output} filename={downloadFilename} mime={downloadMime} />
      )}
      {extra}
    </div>
  );
}
