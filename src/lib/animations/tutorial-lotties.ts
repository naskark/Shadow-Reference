import type { ToolKind } from "@/data/tools";

type RGBA = [number, number, number, number];

function rectLayer(
  name: string,
  x: number,
  y: number,
  w: number,
  h: number,
  color: RGBA,
  opacityKeyframes: { t: number; o: number }[],
  index: number
) {
  return {
    ddd: 0,
    ind: index,
    ty: 4,
    nm: name,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: opacityKeyframes.map((k) => ({
          t: k.t,
          s: [k.o],
          h: 1,
        })),
      },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [x, y, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] },
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            ty: "rc",
            d: 1,
            s: { a: 0, k: [w, h] },
            p: { a: 0, k: [0, 0] },
            r: { a: 0, k: 10 },
            nm: "Rect",
          },
          { ty: "fl", c: { a: 0, k: color }, o: { a: 0, k: 100 }, nm: "Fill" },
          {
            ty: "tr",
            p: { a: 0, k: [0, 0] },
            a: { a: 0, k: [0, 0] },
            s: { a: 0, k: [100, 100] },
            r: { a: 0, k: 0 },
            o: { a: 0, k: 100 },
            nm: "Transform",
          },
        ],
        nm: name,
      },
    ],
    ip: 0,
    op: 120,
    st: 0,
    bm: 0,
  };
}

function circleLayer(
  name: string,
  x: number,
  y: number,
  radius: number,
  color: RGBA,
  opacityKeyframes: { t: number; o: number }[],
  index: number
) {
  return {
    ddd: 0,
    ind: index,
    ty: 4,
    nm: name,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: opacityKeyframes.map((k) => ({
          t: k.t,
          s: [k.o],
          h: 1,
        })),
      },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [x, y, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] },
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            ty: "el",
            d: 1,
            s: { a: 0, k: [radius * 2, radius * 2] },
            p: { a: 0, k: [0, 0] },
            nm: "Circle",
          },
          { ty: "fl", c: { a: 0, k: color }, o: { a: 0, k: 100 }, nm: "Fill" },
          {
            ty: "tr",
            p: { a: 0, k: [0, 0] },
            a: { a: 0, k: [0, 0] },
            s: { a: 0, k: [100, 100] },
            r: { a: 0, k: 0 },
            o: { a: 0, k: 100 },
            nm: "Transform",
          },
        ],
        nm: name,
      },
    ],
    ip: 0,
    op: 120,
    st: 0,
    bm: 0,
  };
}

const CYAN: RGBA = [0.133, 0.827, 0.933, 1];
const VIOLET: RGBA = [0.655, 0.545, 0.98, 1];
const MUTED: RGBA = [0.45, 0.52, 0.62, 0.35];
const GREEN: RGBA = [0.204, 0.827, 0.6, 1];
const RED: RGBA = [0.973, 0.443, 0.443, 1];

function baseLottie(layers: object[]) {
  return {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 120,
    w: 480,
    h: 220,
    nm: "ShadowReference Tutorial",
    ddd: 0,
    assets: [],
    layers,
  };
}

/** Input → action → output workflow */
function workflowAnimation() {
  return baseLottie([
    rectLayer("Input", 90, 110, 120, 70, MUTED, [
      { t: 0, o: 0 },
      { t: 15, o: 100 },
      { t: 105, o: 100 },
      { t: 120, o: 0 },
    ], 1),
    circleLayer("Action", 240, 110, 18, CYAN, [
      { t: 0, o: 0 },
      { t: 30, o: 0 },
      { t: 40, o: 100 },
      { t: 55, o: 60 },
      { t: 70, o: 100 },
      { t: 105, o: 100 },
      { t: 120, o: 0 },
    ], 2),
    rectLayer("Output", 330, 110, 120, 70, CYAN, [
      { t: 0, o: 0 },
      { t: 60, o: 0 },
      { t: 75, o: 100 },
      { t: 105, o: 100 },
      { t: 120, o: 0 },
    ], 3),
  ]);
}

/** Two-panel swap / encode-decode */
function dualAnimation() {
  return baseLottie([
    rectLayer("Left", 70, 110, 130, 75, MUTED, [
      { t: 0, o: 100 },
      { t: 120, o: 100 },
    ], 1),
    rectLayer("Right", 280, 110, 130, 75, VIOLET, [
      { t: 0, o: 30 },
      { t: 40, o: 30 },
      { t: 55, o: 100 },
      { t: 120, o: 100 },
    ], 2),
    circleLayer("Swap", 240, 110, 16, CYAN, [
      { t: 0, o: 0 },
      { t: 25, o: 100 },
      { t: 45, o: 100 },
      { t: 120, o: 0 },
    ], 3),
  ]);
}

/** Side-by-side compare */
function compareAnimation() {
  return baseLottie([
    rectLayer("Original", 60, 110, 150, 80, MUTED, [{ t: 0, o: 100 }, { t: 120, o: 100 }], 1),
    rectLayer("Modified", 270, 110, 150, 80, MUTED, [{ t: 0, o: 100 }, { t: 120, o: 100 }], 2),
    rectLayer("Added", 270, 95, 150, 18, GREEN, [
      { t: 0, o: 0 },
      { t: 45, o: 0 },
      { t: 60, o: 90 },
      { t: 120, o: 90 },
    ], 3),
    rectLayer("Removed", 60, 145, 150, 18, RED, [
      { t: 0, o: 0 },
      { t: 45, o: 0 },
      { t: 60, o: 90 },
      { t: 120, o: 90 },
    ], 4),
  ]);
}

/** Document / markdown scroll */
function documentAnimation() {
  return baseLottie([
    rectLayer("Doc", 140, 110, 200, 90, MUTED, [{ t: 0, o: 100 }, { t: 120, o: 100 }], 1),
    rectLayer("Line1", 160, 90, 160, 8, CYAN, [
      { t: 0, o: 0 },
      { t: 20, o: 100 },
      { t: 120, o: 100 },
    ], 2),
    rectLayer("Line2", 160, 108, 120, 8, VIOLET, [
      { t: 0, o: 0 },
      { t: 35, o: 100 },
      { t: 120, o: 100 },
    ], 3),
    rectLayer("Line3", 160, 126, 140, 8, CYAN, [
      { t: 0, o: 0 },
      { t: 50, o: 100 },
      { t: 120, o: 100 },
    ], 4),
    rectLayer("Preview", 300, 110, 100, 90, CYAN, [
      { t: 0, o: 0 },
      { t: 65, o: 0 },
      { t: 80, o: 70 },
      { t: 120, o: 70 },
    ], 5),
  ]);
}

/** Token / security decode */
function tokenAnimation() {
  return baseLottie([
    rectLayer("Token", 120, 110, 240, 50, MUTED, [{ t: 0, o: 100 }, { t: 120, o: 100 }], 1),
    rectLayer("Header", 140, 85, 70, 30, CYAN, [
      { t: 0, o: 0 },
      { t: 40, o: 0 },
      { t: 55, o: 100 },
      { t: 120, o: 100 },
    ], 2),
    rectLayer("Payload", 230, 85, 90, 30, VIOLET, [
      { t: 0, o: 0 },
      { t: 65, o: 0 },
      { t: 80, o: 100 },
      { t: 120, o: 100 },
    ], 3),
  ]);
}

/** Generate / random output */
function generateAnimation() {
  return baseLottie([
    circleLayer("Pulse1", 200, 90, 12, CYAN, [
      { t: 0, o: 30 },
      { t: 30, o: 100 },
      { t: 60, o: 30 },
      { t: 120, o: 30 },
    ], 1),
    circleLayer("Pulse2", 240, 110, 12, VIOLET, [
      { t: 0, o: 30 },
      { t: 20, o: 30 },
      { t: 50, o: 100 },
      { t: 80, o: 30 },
      { t: 120, o: 30 },
    ], 2),
    circleLayer("Pulse3", 280, 130, 12, CYAN, [
      { t: 0, o: 30 },
      { t: 40, o: 30 },
      { t: 70, o: 100 },
      { t: 120, o: 30 },
    ], 3),
    rectLayer("Result", 170, 155, 140, 28, GREEN, [
      { t: 0, o: 0 },
      { t: 75, o: 0 },
      { t: 90, o: 100 },
      { t: 120, o: 100 },
    ], 4),
  ]);
}

/** Reference list / table */
function referenceAnimation() {
  return baseLottie([
    rectLayer("Row1", 100, 75, 280, 22, CYAN, [{ t: 0, o: 60 }, { t: 120, o: 60 }], 1),
    rectLayer("Row2", 100, 105, 280, 22, MUTED, [{ t: 0, o: 40 }, { t: 120, o: 40 }], 2),
    rectLayer("Row3", 100, 135, 280, 22, MUTED, [{ t: 0, o: 40 }, { t: 120, o: 40 }], 3),
    rectLayer("Highlight", 100, 105, 280, 22, VIOLET, [
      { t: 0, o: 0 },
      { t: 35, o: 0 },
      { t: 50, o: 80 },
      { t: 120, o: 80 },
    ], 4),
  ]);
}

const KIND_ANIMATIONS: Record<ToolKind, () => object> = {
  transform: workflowAnimation,
  dual: dualAnimation,
  jwt: tokenAnimation,
  regex: workflowAnimation,
  timestamp: workflowAnimation,
  datetime: workflowAnimation,
  "http-status": referenceAnimation,
  color: dualAnimation,
  formatter: workflowAnimation,
  markdown: documentAnimation,
  "markdown-reader": documentAnimation,
  "code-compare": compareAnimation,
  "csv-json": dualAnimation,
  yaml: workflowAnimation,
  xml: workflowAnimation,
  "crypto-hash": generateAnimation,
  "crypto-hmac": tokenAnimation,
  curl: workflowAnimation,
  "url-parser": referenceAnimation,
  uuid: generateAnimation,
  qr: generateAnimation,
};

export function getTutorialAnimation(kind: ToolKind): object {
  return (KIND_ANIMATIONS[kind] ?? workflowAnimation)();
}

/** Duration of one tutorial loop in ms (matches 120 frames @ 30fps = 4000ms) */
export const TUTORIAL_LOOP_MS = 4000;

export function getStepIndexForFrame(frame: number, stepCount: number): number {
  if (stepCount <= 1) return 0;
  const progress = (frame % 120) / 120;
  return Math.min(stepCount - 1, Math.floor(progress * stepCount));
}
