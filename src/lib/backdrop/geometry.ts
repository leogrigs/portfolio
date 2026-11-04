/** Pure layout and motion helpers for the background line drawings. */

export const MOBILE_BREAKPOINT = 768;

export interface Pointer {
  x: number;
  y: number;
  /** 0..1, eased in and out as the pointer arrives or leaves */
  strength: number;
}

export function clockLayout(width: number, height: number) {
  const mobile = width < MOBILE_BREAKPOINT;
  return {
    cx: mobile ? width * 0.82 : width * 0.74,
    cy: mobile ? height * 0.2 : height * 0.5,
    r: mobile ? width * 0.42 : Math.min(width, height) * 0.27,
  };
}

export interface WaveLayout {
  y: number;
  amp: number;
  /** vertical distance between neighbouring lines */
  gap: number;
}

export function waveLayout(width: number, height: number): WaveLayout {
  const mobile = width < MOBILE_BREAKPOINT;
  return {
    y: height * (mobile ? 0.93 : 0.88),
    amp: height * (mobile ? 0.05 : 0.045),
    gap: height * (mobile ? 0.008 : 0.011),
  };
}

/** y of wave line `line` (0 is the middle one) at x and time t (ms). */
export function waveY(x: number, width: number, t: number, layout: WaveLayout, line: number) {
  const u = x / width;
  return (
    layout.y +
    Math.sin(u * Math.PI * 2.4 + t * 0.0007 + line * 0.22) * layout.amp +
    Math.sin(u * Math.PI * 6.2 - t * 0.0011) * layout.amp * 0.22 +
    line * layout.gap
  );
}

/** Pushes a point away from the pointer, so lines bend around the cursor. */
export function push(
  x: number,
  y: number,
  pointer: Pointer,
  radius: number,
  amount: number
): [number, number] {
  if (pointer.strength <= 0) return [x, y];
  const dx = x - pointer.x;
  const dy = y - pointer.y;
  const d = Math.hypot(dx, dy);
  if (d >= radius || d < 0.001) return [x, y];
  const f = 1 - d / radius;
  const k = f * f * amount * pointer.strength;
  return [x + (dx / d) * k, y + (dy / d) * k];
}

export const easeOutCubic = (p: number) => 1 - (1 - Math.min(1, Math.max(0, p))) ** 3;
