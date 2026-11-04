import {
  clockDialPoints,
  fitText,
  mulberry32,
  pickPoints,
  scatterPoints,
  waveBasePoints,
} from "../src/lib/particles/shapes";

function points(arr: Float32Array) {
  const out: [number, number][] = [];
  for (let i = 0; i < arr.length; i += 2) out.push([arr[i], arr[i + 1]]);
  return out;
}

describe("particle shapes", () => {
  it("mulberry32 is deterministic", () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    const seqA = [a(), a(), a()];
    expect([b(), b(), b()]).toEqual(seqA);
    seqA.forEach((v) => {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    });
  });

  it("scatterPoints stays inside the margins", () => {
    const pts = points(scatterPoints(500, 800, 600, mulberry32(1), 0.1));
    expect(pts).toHaveLength(500);
    for (const [x, y] of pts) {
      expect(x).toBeGreaterThanOrEqual(80);
      expect(x).toBeLessThanOrEqual(720);
      expect(y).toBeGreaterThanOrEqual(60);
      expect(y).toBeLessThanOrEqual(540);
    }
  });

  it("pickPoints returns exactly n points from the candidates", () => {
    const candidates = [0, 0, 10, 10, 20, 20];
    const pts = points(pickPoints(candidates, 3, mulberry32(3)));
    expect(pts).toHaveLength(3);
    expect(pts.map(([x]) => x).sort((a, b) => a - b)).toEqual([0, 10, 20]);
  });

  it("pickPoints reuses candidates with jitter when there are too few", () => {
    const pts = points(pickPoints([5, 5], 4, mulberry32(3), 1));
    expect(pts).toHaveLength(4);
    for (const [x, y] of pts) {
      expect(Math.abs(x - 5)).toBeLessThanOrEqual(1);
      expect(Math.abs(y - 5)).toBeLessThanOrEqual(1);
    }
  });

  it("pickPoints handles no candidates", () => {
    expect(pickPoints([], 2, mulberry32(1))).toHaveLength(4);
  });

  it("clockDialPoints sit on or just inside the dial", () => {
    const layout = { cx: 100, cy: 100, radius: 50, dialCount: 300 };
    for (const [x, y] of points(clockDialPoints(layout, mulberry32(9)))) {
      const r = Math.hypot(x - 100, y - 100);
      expect(r).toBeGreaterThan(50 * 0.85);
      expect(r).toBeLessThan(50 * 1.03);
    }
  });

  it("waveBasePoints spread across the width", () => {
    const pts = points(waveBasePoints(200, 1000, mulberry32(5)));
    for (const [x, offset] of pts) {
      expect(x).toBeGreaterThanOrEqual(-50);
      expect(x).toBeLessThanOrEqual(1050);
      expect(Math.abs(offset)).toBeLessThanOrEqual(1);
    }
  });

  it("fitText respects the tighter of width and height", () => {
    const measure = (line: string) => line.length * 60; // width at 100px
    const byWidth = fitText(["ABCDEFGH"], measure, 480, 1000);
    expect(byWidth.fontSize).toBeCloseTo(100);
    const byHeight = fitText(["AB", "CD"], measure, 10_000, 184, 0.92);
    expect(byHeight.fontSize).toBeCloseTo(100);
    expect(byHeight.lineHeight).toBeCloseTo(92);
  });
});
