import type { NextConfig } from "next";
import { existsSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";
const adsTxtPath = join(process.cwd(), "public", "ads.txt");
const adsTxtMatch = client.trim().match(/^ca-pub-(\d{10,20})$/);
if (adsTxtMatch) {
  writeFileSync(
    adsTxtPath,
    `google.com, pub-${adsTxtMatch[1]}, DIRECT, f08c47fec0942fa0\n`,
  );
} else if (existsSync(adsTxtPath)) {
  unlinkSync(adsTxtPath);
}

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
