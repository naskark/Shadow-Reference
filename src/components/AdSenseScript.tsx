"use client";

import Script from "next/script";
import { ADSENSE_CLIENT, adsEnabled } from "@/lib/ads";

export function AdSenseScript() {
  if (!adsEnabled()) return null;

  return (
    <Script
      id="adsense-script"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
