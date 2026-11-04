/**
 * Pure target generators for the particle field. Every generator returns a
 * flat Float32Array of exactly `n` points: [x0, y0, x1, y1, ...] in CSS px.
 */

export type Rand = () => number;

/** Small deterministic PRNG so layouts are stable across renders and tests. */
export function mulberry32(seed: number): Rand {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function scatterPoints(
  n: number,
  width: number,
  height: number,
  rand: Rand,
  margin = 0.04
): Float32Array {
  const out = new Float32Array(n * 2);
  const mx = width * margin;
  const my = height * margin;
  for (let i = 0; i < n; i++) {
    out[i * 2] = mx + rand() * (width - mx * 2);
    out[i * 2 + 1] = my + rand() * (height - my * 2);
  }
  return out;
}

/**
 * Picks exactly `n` points from a candidate list. When there are fewer
 * candidates than particles, points are reused with a tiny jitter so stacked
 * particles don't collapse into a single pixel.
 */
export function pickPoints(
  candidates: ArrayLike<number>,
  n: number,
  rand: Rand,
  jitter = 0.8
): Float32Array {
  const out = new Float32Array(n * 2);
  const total = Math.floor(candidates.length / 2);
  if (total === 0) return out;

  const order = Array.from({ length: total }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  for (let i = 0; i < n; i++) {
    const idx = order[i % total];
    const reused = i >= total;
    out[i * 2] = candidates[idx * 2] + (reused ? (rand() - 0.5) * jitter * 2 : 0);
    out[i * 2 + 1] =
      candidates[idx * 2 + 1] + (reused ? (rand() - 0.5) * jitter * 2 : 0);
  }
  return out;
}

export interface ClockLayout {
  cx: number;
  cy: number;
  radius: number;
  /** how many of the n particles form the dial; the rest are the hands */
  dialCount: number;
}

/** A clock dial: a thin ring plus twelve denser tick marks. Hands are animated live. */
export function clockDialPoints(
  layout: ClockLayout,
  rand: Rand
): Float32Array {
  const { cx, cy, radius, dialCount } = layout;
  const out = new Float32Array(dialCount * 2);
  const tickCount = Math.floor(dialCount * 0.18);
  for (let i = 0; i < dialCount; i++) {
    let angle: number;
    let r: number;
    if (i < tickCount) {
      const tick = i % 12;
      angle = (tick / 12) * Math.PI * 2 + (rand() - 0.5) * 0.02;
      r = radius * (0.86 + rand() * 0.1);
    } else {
      angle = rand() * Math.PI * 2;
      r = radius * (1 + (rand() - 0.5) * 0.035);
    }
    out[i * 2] = cx + Math.cos(angle) * r;
    out[i * 2 + 1] = cy + Math.sin(angle) * r;
  }
  return out;
}

/** Base x positions for the wave; y is animated live from these. */
export function waveBasePoints(
  n: number,
  width: number,
  rand: Rand
): Float32Array {
  const out = new Float32Array(n * 2);
  for (let i = 0; i < n; i++) {
    out[i * 2] = -width * 0.05 + rand() * width * 1.1;
    // y slot stores a gaussian-ish offset used to give the wave thickness
    out[i * 2 + 1] = (rand() + rand() + rand() - 1.5) / 1.5;
  }
  return out;
}

export interface TextFit {
  fontSize: number;
  lineHeight: number;
}

/**
 * Picks a font size so the widest line fits `maxWidth` and the block fits
 * `maxHeight`. `measure` returns the width of a line at 100px.
 */
export function fitText(
  lines: string[],
  measure: (line: string) => number,
  maxWidth: number,
  maxHeight: number,
  lineHeightRatio = 0.92
): TextFit {
  const widest = Math.max(1, ...lines.map((line) => measure(line)));
  const byWidth = (maxWidth / widest) * 100;
  const byHeight = maxHeight / (Math.max(1, lines.length) * lineHeightRatio);
  const fontSize = Math.max(12, Math.min(byWidth, byHeight));
  return { fontSize, lineHeight: fontSize * lineHeightRatio };
}
