import { mulberry32 } from "../src/lib/particles/shapes";
import { sampleTextPoints } from "../src/lib/particles/text";

/** a fake 2D context whose every pixel is "ink", sized by the canvas it belongs to */
function stubCanvas() {
  const original = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function () {
    return {
      font: "",
      fillStyle: "",
      textAlign: "",
      textBaseline: "",
      measureText: () => ({ width: 400, actualBoundingBoxAscent: 70, actualBoundingBoxDescent: 0 }),
      fillText: () => {},
      getImageData: (_x: number, _y: number, w: number, h: number) => ({
        data: new Uint8ClampedArray(w * h * 4).fill(255),
      }),
    };
  } as unknown as HTMLCanvasElement["getContext"];
  return () => {
    HTMLCanvasElement.prototype.getContext = original;
  };
}

describe("sampleTextPoints", () => {
  it("returns null without canvas support", () => {
    const points = sampleTextPoints({
      lines: ["HI"],
      n: 10,
      cx: 0,
      cy: 0,
      maxWidth: 100,
      maxHeight: 100,
      rand: mulberry32(1),
    });
    expect(points).toBeNull();
  });

  it("spreads exactly n points evenly over the ink, centred on the target", () => {
    const restore = stubCanvas();
    const n = 2000;
    const points = sampleTextPoints({
      lines: ["LEONARDO"],
      n,
      cx: 500,
      cy: 300,
      maxWidth: 400,
      maxHeight: 400,
      rand: mulberry32(2),
    });
    restore();

    expect(points).toHaveLength(n * 2);
    const xs: number[] = [];
    const ys: number[] = [];
    for (let i = 0; i < n; i++) {
      xs.push(points![i * 2]);
      ys.push(points![i * 2 + 1]);
    }
    const mean = (v: number[]) => v.reduce((a, b) => a + b, 0) / v.length;
    expect(mean(xs)).toBeCloseTo(500, -1);
    expect(mean(ys)).toBeCloseTo(300, -1);

    // stratified sampling: no left/right half should be starved
    const left = xs.filter((x) => x < 500).length;
    expect(left / n).toBeGreaterThan(0.4);
    expect(left / n).toBeLessThan(0.6);
  });
});
