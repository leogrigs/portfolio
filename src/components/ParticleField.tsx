import type { ChapterId } from "@/content";
import {
  clockDialPoints,
  mulberry32,
  scatterPoints,
  waveBasePoints,
} from "@/lib/particles/shapes";
import { sampleTextPoints } from "@/lib/particles/text";
import { useEffect, useRef } from "react";

type SceneKind = "text" | "drift" | "clock" | "wave";

const SCENE_KIND: Record<ChapterId, SceneKind> = {
  home: "text",
  impact: "clock",
  path: "wave",
  contact: "text",
};

const SCENE_ALPHA: Record<ChapterId, [desktop: number, mobile: number]> = {
  home: [1, 1],
  impact: [0.72, 0.34],
  path: [0.62, 0.3],
  contact: [0.26, 0.2],
};

const MOBILE_BREAKPOINT = 768;
/** dark dots on paper read lighter than light dots on black at the same alpha */
const LIGHT_THEME_BOOST = 1.4;

interface Sim {
  n: number;
  x: Float32Array;
  y: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  size: Float32Array;
  seed: Float32Array;
  accent: Uint8Array;
  base: Float32Array;
  kind: SceneKind;
  clock: { cx: number; cy: number; radius: number; dialCount: number };
  wave: { y: number; amp: number; thickness: number };
  alpha: number;
  targetAlpha: number;
  width: number;
  height: number;
  dpr: number;
  fg: string;
  accentColor: string;
  light: boolean;
  pointer: { x: number; y: number; active: boolean };
}

export interface ParticleFieldProps {
  scene: ChapterId;
  heroLines: string[];
  contactWord: string;
  /** particles stay hidden and scattered until active (after the intro) */
  active: boolean;
  reducedMotion: boolean;
  onSupportChange?: (supported: boolean) => void;
}

function readColor(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value ? `hsl(${value})` : fallback;
}

function particleCount(width: number, height: number) {
  if (width < MOBILE_BREAKPOINT) return 1000;
  return Math.round(Math.min(4200, Math.max(2200, (width * height) / 300)));
}

function createSim(width: number, height: number, dpr: number): Sim {
  const n = particleCount(width, height);
  const rand = mulberry32(7);
  const start = scatterPoints(n, width, height, rand, 0);
  const sim: Sim = {
    n,
    x: new Float32Array(n),
    y: new Float32Array(n),
    vx: new Float32Array(n),
    vy: new Float32Array(n),
    size: new Float32Array(n),
    seed: new Float32Array(n),
    accent: new Uint8Array(n),
    base: start.slice(),
    kind: "drift",
    clock: { cx: 0, cy: 0, radius: 0, dialCount: n },
    wave: { y: 0, amp: 0, thickness: 0 },
    alpha: 0,
    targetAlpha: 0,
    width,
    height,
    dpr,
    fg: "#eee",
    accentColor: "#fff",
    light: false,
    pointer: { x: -9999, y: -9999, active: false },
  };
  for (let i = 0; i < n; i++) {
    sim.x[i] = start[i * 2];
    sim.y[i] = start[i * 2 + 1];
    sim.size[i] = 1 + rand() * 1.1;
    sim.seed[i] = rand();
    sim.accent[i] = rand() < 0.06 ? 1 : 0;
  }
  return sim;
}

function buildScene(
  sim: Sim,
  scene: ChapterId,
  active: boolean,
  heroLines: string[],
  contactWord: string
) {
  const { n, width: w, height: h } = sim;
  const mobile = w < MOBILE_BREAKPOINT;
  const rand = mulberry32(scene.length * 997 + Math.round(w));
  const kind: SceneKind = active ? SCENE_KIND[scene] : "drift";

  sim.kind = kind;
  sim.targetAlpha = active ? SCENE_ALPHA[scene][mobile ? 1 : 0] : 0;

  switch (kind) {
    case "text": {
      const isHero = scene === "home";
      const points = sampleTextPoints({
        lines: isHero ? heroLines : [contactWord],
        n,
        cx: w / 2,
        cy: isHero ? h * (mobile ? 0.36 : 0.4) : h * 0.5,
        maxWidth: w * (mobile ? 0.9 : 0.86),
        maxHeight: h * (isHero ? (mobile ? 0.28 : 0.46) : 0.72),
        rand,
        weight: isHero ? 700 : 600,
      });
      sim.base = points ?? scatterPoints(n, w, h, rand);
      break;
    }
    case "drift":
      sim.base = scatterPoints(n, w, h, rand);
      break;
    case "clock": {
      const radius = mobile ? w * 0.42 : Math.min(w, h) * 0.27;
      sim.clock = {
        cx: mobile ? w * 0.82 : w * 0.74,
        cy: mobile ? h * 0.2 : h * 0.5,
        radius,
        dialCount: Math.floor(n * 0.84),
      };
      const dial = clockDialPoints(sim.clock, rand);
      const base = new Float32Array(n * 2);
      base.set(dial);
      sim.base = base;
      break;
    }
    case "wave":
      sim.base = waveBasePoints(n, w, rand);
      sim.wave = {
        y: h * (mobile ? 0.93 : 0.88),
        amp: h * (mobile ? 0.05 : 0.045),
        thickness: h * (mobile ? 0.02 : 0.028),
      };
      break;
  }

  // a small burst so every scene change reads as a transformation
  if (active) {
    for (let i = 0; i < n; i++) {
      sim.vx[i] += (rand() - 0.5) * 7;
      sim.vy[i] += (rand() - 0.5) * 7;
    }
  }
}

function targetFor(sim: Sim, i: number, t: number): [number, number] {
  const bx = sim.base[i * 2];
  const by = sim.base[i * 2 + 1];
  const s = sim.seed[i];
  switch (sim.kind) {
    case "text":
      return [bx + Math.sin(t * 0.0012 + s * 40) * 0.6, by + Math.cos(t * 0.001 + s * 30) * 0.6];
    case "drift":
      return [
        bx + Math.sin(t * 0.00022 * (0.6 + s) + s * 50) * 46,
        by + Math.cos(t * 0.00018 * (0.6 + s) + s * 31) * 46,
      ];
    case "clock": {
      const { cx, cy, radius, dialCount } = sim.clock;
      if (i < dialCount) {
        return [bx + Math.sin(t * 0.001 + s * 20) * 0.8, by + Math.cos(t * 0.001 + s * 20) * 0.8];
      }
      const isMinuteHand = (i - dialCount) % 3 !== 0;
      const angle = isMinuteHand
        ? t * 0.0009 - Math.PI / 2
        : t * 0.000075 + Math.PI / 6;
      const len = (isMinuteHand ? radius * 0.78 : radius * 0.5) * s;
      return [cx + Math.cos(angle) * len, cy + Math.sin(angle) * len];
    }
    case "wave": {
      const { y, amp, thickness } = sim.wave;
      const u = bx / sim.width;
      return [
        bx,
        y +
          Math.sin(u * Math.PI * 2.4 + t * 0.0007) * amp +
          Math.sin(u * Math.PI * 6.2 - t * 0.0011) * amp * 0.22 +
          by * thickness,
      ];
    }
  }
}

function draw(ctx: CanvasRenderingContext2D, sim: Sim) {
  const { n, x, y, size, accent, width, height } = sim;
  ctx.clearRect(0, 0, width, height);
  if (sim.alpha < 0.005) return;
  const alpha = Math.min(1, sim.alpha * (sim.light ? LIGHT_THEME_BOOST : 1));
  // small screens pack the word tightly, so dots stay finer there
  const scale = sim.kind === "text" ? (width < MOBILE_BREAKPOINT ? 0.85 : 1.2) : 1;
  const handsStart = sim.kind === "clock" ? sim.clock.dialCount : n;

  // pass 1 draws the accent particles (sparkles and clock hands) brighter and larger,
  // so they stand out even when the accent colour matches the foreground
  for (let pass = 0; pass < 2; pass++) {
    ctx.globalAlpha = pass === 0 ? alpha : Math.min(1, alpha * 1.6);
    ctx.fillStyle = pass === 0 ? sim.fg : sim.accentColor;
    const passScale = pass === 0 ? scale : scale * 1.3;
    for (let i = 0; i < n; i++) {
      const isAccent = accent[i] === 1 || i >= handsStart;
      if ((pass === 1) !== isAccent) continue;
      const px = x[i];
      const py = y[i];
      if (px < -4 || py < -4 || px > width + 4 || py > height + 4) continue;
      const s = size[i] * passScale;
      ctx.fillRect(px - s / 2, py - s / 2, s, s);
    }
  }
}

export default function ParticleField({
  scene,
  heroLines,
  contactWord,
  active,
  reducedMotion,
  onSupportChange,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simRef = useRef<Sim | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const propsRef = useRef({ scene, heroLines, contactWord, active });
  propsRef.current = { scene, heroLines, contactWord, active };
  const supportRef = useRef(onSupportChange);
  supportRef.current = onSupportChange;
  const rebuildRef = useRef<(() => void) | null>(null);

  // mount: canvas, simulation, loop, listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d") ?? null;
    if (!canvas || !ctx) {
      supportRef.current?.(false);
      return;
    }
    ctxRef.current = ctx;
    supportRef.current?.(true);

    const size = () => ({
      width: window.innerWidth,
      height: window.innerHeight,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });

    const applySize = (sim: Sim) => {
      canvas.width = Math.round(sim.width * sim.dpr);
      canvas.height = Math.round(sim.height * sim.dpr);
      canvas.style.width = `${sim.width}px`;
      canvas.style.height = `${sim.height}px`;
      ctx.setTransform(sim.dpr, 0, 0, sim.dpr, 0, 0);
    };

    const { width, height, dpr } = size();
    const sim = createSim(width, height, dpr);
    simRef.current = sim;
    applySize(sim);

    const readColors = () => {
      sim.fg = readColor("--particle", sim.fg);
      sim.accentColor = readColor("--accent", sim.accentColor);
      sim.light = !document.documentElement.classList.contains("dark");
    };
    readColors();

    const settle = (t: number) => {
      for (let i = 0; i < sim.n; i++) {
        const [tx, ty] = targetFor(sim, i, t);
        sim.x[i] = tx;
        sim.y[i] = ty;
        sim.vx[i] = 0;
        sim.vy[i] = 0;
      }
      sim.alpha = sim.targetAlpha;
    };

    const rebuild = () => {
      const p = propsRef.current;
      buildScene(sim, p.scene, p.active, p.heroLines, p.contactWord);
      if (reducedMotion) {
        settle(0);
        draw(ctx, sim);
      }
    };
    rebuildRef.current = rebuild;
    rebuild();

    let frame = 0;
    const tick = (t: number) => {
      frame = requestAnimationFrame(tick);
      sim.alpha += (sim.targetAlpha - sim.alpha) * 0.045;
      const stiffness = sim.kind === "text" ? 0.05 : 0.026;
      const damping = 0.86;
      const { pointer } = sim;
      const radius = sim.width < MOBILE_BREAKPOINT ? 80 : 120;
      const r2 = radius * radius;
      for (let i = 0; i < sim.n; i++) {
        const [tx, ty] = targetFor(sim, i, t);
        let vx = sim.vx[i] + (tx - sim.x[i]) * stiffness;
        let vy = sim.vy[i] + (ty - sim.y[i]) * stiffness;
        if (pointer.active) {
          const dx = sim.x[i] - pointer.x;
          const dy = sim.y[i] - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < r2 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const force = (1 - d / radius) * 2.4;
            vx += (dx / d) * force;
            vy += (dy / d) * force;
          }
        }
        vx *= damping;
        vy *= damping;
        sim.vx[i] = vx;
        sim.vy[i] = vy;
        sim.x[i] += vx;
        sim.y[i] += vy;
      }
      draw(ctx, sim);
    };

    const start = () => {
      if (!reducedMotion && !frame) frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    start();

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const onPointerMove = (e: PointerEvent) => {
      sim.pointer.x = e.clientX;
      sim.pointer.y = e.clientY;
      sim.pointer.active = true;
    };
    const onPointerOut = (e: PointerEvent) => {
      if (e.type === "pointerup" && e.pointerType === "mouse") return;
      sim.pointer.active = false;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerOut, { passive: true });
    window.addEventListener("pointercancel", onPointerOut, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerOut);

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const next = size();
        const widthChanged = next.width !== sim.width;
        // mobile browser chrome resizes the viewport while scrolling; ignore small height-only changes
        if (!widthChanged && Math.abs(next.height - sim.height) < 140) return;
        sim.width = next.width;
        sim.height = next.height;
        sim.dpr = next.dpr;
        applySize(sim);
        rebuild();
      }, 140);
    };
    window.addEventListener("resize", onResize);

    const themeObserver = new MutationObserver(() => {
      readColors();
      if (reducedMotion) draw(ctx, sim);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // text targets depend on the web font; resample once it is available
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) rebuild();
    });

    return () => {
      cancelled = true;
      stop();
      window.clearTimeout(resizeTimer);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerOut);
      window.removeEventListener("pointercancel", onPointerOut);
      document.documentElement.removeEventListener("pointerleave", onPointerOut);
      window.removeEventListener("resize", onResize);
      themeObserver.disconnect();
      rebuildRef.current = null;
    };
  }, [reducedMotion]);

  useEffect(() => {
    rebuildRef.current?.();
  }, [scene, active, heroLines, contactWord]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
