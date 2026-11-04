import { fitText, pickPoints, type Rand } from "./shapes";

export const PARTICLE_FONT = '"Geist", "Inter", system-ui, sans-serif';

interface TextSampleOptions {
  lines: string[];
  n: number;
  cx: number;
  cy: number;
  maxWidth: number;
  maxHeight: number;
  rand: Rand;
  weight?: number;
}

/**
 * Renders the lines on an offscreen canvas, samples the filled pixels and
 * returns `n` points centred on (cx, cy). Returns null without canvas support.
 */
export function sampleTextPoints({
  lines,
  n,
  cx,
  cy,
  maxWidth,
  maxHeight,
  rand,
  weight = 700,
}: TextSampleOptions): Float32Array | null {
  const measureCtx = document.createElement("canvas").getContext("2d");
  if (!measureCtx) return null;

  measureCtx.font = `${weight} 100px ${PARTICLE_FONT}`;
  const fit = fitText(
    lines,
    (line) => measureCtx.measureText(line).width,
    maxWidth,
    maxHeight
  );
  const font = `${weight} ${fit.fontSize}px ${PARTICLE_FONT}`;
  measureCtx.font = font;

  const metrics = lines.map((line) => measureCtx.measureText(line));
  const ascent = Math.max(
    ...metrics.map((m) => m.actualBoundingBoxAscent || fit.fontSize * 0.72)
  );
  const descent = Math.max(
    ...metrics.map((m) => m.actualBoundingBoxDescent || 0)
  );
  const pad = Math.ceil(fit.fontSize * 0.06) + 2;
  const blockWidth = Math.ceil(Math.max(...metrics.map((m) => m.width))) + pad * 2;
  const blockHeight = Math.ceil(
    pad * 2 + ascent + descent + (lines.length - 1) * fit.lineHeight
  );

  const canvas = document.createElement("canvas");
  canvas.width = blockWidth;
  canvas.height = blockHeight;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  ctx.font = font;
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  lines.forEach((line, i) => {
    ctx.fillText(line, blockWidth / 2, pad + ascent + i * fit.lineHeight);
  });

  const { data } = ctx.getImageData(0, 0, blockWidth, blockHeight);
  const inside = (x: number, y: number) => {
    const xi = x | 0;
    const yi = y | 0;
    if (xi < 0 || yi < 0 || xi >= blockWidth || yi >= blockHeight) return false;
    return data[(yi * blockWidth + xi) * 4 + 3] > 140;
  };

  // size the sampling cell so the ink holds about one particle per cell:
  // even coverage is what keeps the letters legible
  let filled = 0;
  for (let y = 0; y < blockHeight; y += 2) {
    for (let x = 0; x < blockWidth; x += 2) {
      if (inside(x, y)) filled++;
    }
  }
  const gap = Math.max(1.5, Math.sqrt((filled * 4) / (n * 1.08)));

  const originX = cx - blockWidth / 2;
  const originY = cy - blockHeight / 2;
  const candidates: number[] = [];
  for (let gy = 0; gy < blockHeight; gy += gap) {
    for (let gx = 0; gx < blockWidth; gx += gap) {
      // one random sample per cell: even density without a visible dot-matrix
      const sx = gx + rand() * gap;
      const sy = gy + rand() * gap;
      if (inside(sx, sy)) candidates.push(originX + sx, originY + sy);
    }
  }

  return pickPoints(candidates, n, rand, 0.6);
}
