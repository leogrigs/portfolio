import {
  clockLayout,
  easeOutCubic,
  push,
  waveLayout,
  waveY,
} from "../src/lib/backdrop/geometry";

describe("backdrop geometry", () => {
  it("places the clock on the right on desktop and top right on mobile", () => {
    expect(clockLayout(1000, 800)).toEqual({ cx: 740, cy: 400, r: 216 });
    const mobile = clockLayout(400, 800);
    expect(mobile.cx).toBeCloseTo(328);
    expect(mobile.cy).toBeCloseTo(160);
  });

  it("stacks the wave lines one gap apart", () => {
    const layout = waveLayout(1000, 800);
    const middle = waveY(300, 1000, 0, layout, 0);
    // line offsets also shift the phase slightly, so compare with a tolerance
    expect(waveY(300, 1000, 0, { ...layout, amp: 0 }, 2) - layout.y).toBeCloseTo(layout.gap * 2);
    expect(Math.abs(middle - layout.y)).toBeLessThanOrEqual(layout.amp * 1.22 + 0.001);
  });

  it("pushes points away from the pointer, inside its radius only", () => {
    const pointer = { x: 100, y: 100, strength: 1 };
    const [x, y] = push(110, 100, pointer, 50, 20);
    expect(x).toBeGreaterThan(110);
    expect(y).toBeCloseTo(100);
    expect(push(200, 100, pointer, 50, 20)).toEqual([200, 100]);
    expect(push(110, 100, { ...pointer, strength: 0 }, 50, 20)).toEqual([110, 100]);
  });

  it("eases and clamps", () => {
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
    expect(easeOutCubic(2)).toBe(1);
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.5);
  });
});
