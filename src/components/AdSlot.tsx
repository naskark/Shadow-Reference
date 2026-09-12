"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT, ADSENSE_SLOT, adsEnabled } from "@/lib/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({
  slot = ADSENSE_SLOT,
  format = "horizontal",
}: {
  slot?: string;
  format?: "horizontal" | "rectangle" | "auto";
}) {
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const el = insRef.current;
    if (!adsEnabled() || !slot || !el) return;
    if (el.getAttribute("data-adsbygoogle-status")) return;
    try {
      window.adsbygoogle = window.adsbygoogle ?? [];
      window.adsbygoogle.push({});
    } catch {
      // Ad blockers and missing slots should not break the tool.
    }
  }, [slot]);

  if (!adsEnabled() || !slot) return null;

  return (
    <aside className="ad-slot" aria-label="Advertisement">
      <p className="ad-slot-label">Advertisement</p>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
