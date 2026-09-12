export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";
export const ADSENSE_SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_DISPLAY ?? "";

export function isAdsenseClientId(value: string): boolean {
  return /^ca-pub-\d{10,20}$/.test(value.trim());
}

export function adsEnabled(): boolean {
  return isAdsenseClientId(ADSENSE_CLIENT);
}

export function adsTxtLine(client = ADSENSE_CLIENT): string | null {
  if (!isAdsenseClientId(client)) return null;
  const publisherId = client.replace(/^ca-pub-/, "pub-");
  return `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0`;
}
