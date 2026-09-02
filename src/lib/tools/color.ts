import { failure, success, type ToolResult } from "@/lib/utils";

type Rgb = { r: number; g: number; b: number; a?: number };

function clamp(n: number, min = 0, max = 255) {
  return Math.min(max, Math.max(min, n));
}

function parseHex(input: string): ToolResult & { rgb?: Rgb } {
  const hex = input.trim().replace(/^#/, "");
  if (!/^[\da-fA-F]{3,8}$/.test(hex)) return failure("Invalid HEX color.");

  let r: number, g: number, b: number, a: number | undefined;
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } else if (hex.length === 8) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
    a = parseInt(hex.slice(6, 8), 16) / 255;
  } else {
    return failure("HEX must be 3, 6, or 8 characters.");
  }
  return { ok: true, output: "", rgb: { r, g, b, a } };
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function convertColor(input: string): ToolResult {
  const trimmed = input.trim();

  let rgb: Rgb | undefined;

  if (trimmed.startsWith("#") || /^[\da-fA-F]{3,8}$/.test(trimmed)) {
    const r = parseHex(trimmed);
    if (!r.ok) return r;
    rgb = r.rgb;
  } else if (trimmed.startsWith("rgb")) {
    const m = trimmed.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/);
    if (!m) return failure("Invalid RGB/RGBA format.");
    rgb = { r: clamp(+m[1]), g: clamp(+m[2]), b: clamp(+m[3]), a: m[4] !== undefined ? +m[4] : undefined };
  } else if (trimmed.startsWith("hsl")) {
    const m = trimmed.match(/hsla?\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?(?:\s*,\s*([\d.]+))?\s*\)/);
    if (!m) return failure("Invalid HSL/HSLA format.");
    rgb = hslToRgb(+m[1], +m[2], +m[3]);
    if (m[4] !== undefined) rgb.a = +m[4];
  } else {
    return failure("Enter HEX, RGB/RGBA, or HSL/HSLA.");
  }

  if (!rgb) return failure("Could not parse color.");

  const hex = `#${[rgb.r, rgb.g, rgb.b].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
  const hexAlpha = rgb.a !== undefined ? hex + Math.round(rgb.a * 255).toString(16).padStart(2, "0") : hex;
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const rgba = rgb.a !== undefined ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})` : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hsla = rgb.a !== undefined ? `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${rgb.a})` : `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  return success([`HEX: ${hexAlpha}`, `RGB: ${rgba}`, `HSL: ${hsla}`].join("\n"), { preview: hex });
}

function hslToRgb(h: number, s: number, l: number): Rgb {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
}
