import type { ChapterId } from "@/content";
import {
  clockLayout,
  easeOutCubic,
  MOBILE_BREAKPOINT,
  push,
  waveLayout,
  waveY,
  type Pointer,
} from "@/lib/backdrop/geometry";
import { useEffect, useRef } from "react";

type Drawing = "clock" | "wave";

/** which line drawing belongs to each chapter; the others have none */
const DRAWING: Partial<Record<ChapterId, Drawing>> = {
  impact: "clock",
  path: "wave",
};

/** dark lines on paper read lighter than light lines on black at the same alpha */
const LIGHT_THEME_BOOST = 1.25;

interface State {
  width: number;
  height: number;
  dpr: number;
  /** 0..1 per drawing: drives the draw-on and fade as chapters change */
  presence: Record<Drawing, number>;
  target: Record<Drawing, number>;
  pointer: Pointer & { active: boolean };
  fg: string;
  accent: string;
  light: boolean;
}

function readColor(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value ? `hsl(${value})` : fallback;
}

function baseAlpha(state: State, desktop: number, mobile: number) {
  const a = state.width < MOBILE_BREAKPOINT ? mobile : desktop;
  return Math.min(1, a * (state.light ? LIGHT_THEME_BOOST : 1));
}

function drawClock(ctx: CanvasRenderingContext2D, state: State, t: number) {
  const p = state.presence.clock;
  if (p < 0.004) return;
  const { cx, cy, r } = clockLayout(state.width, state.height);
  const e = easeOutCubic(p);
  const alpha = baseAlpha(state, 0.7, 0.34) * p;
  const radius = state.width < MOBILE_BREAKPOINT ? 80 : 120;
  const at = (angle: number, dist: number) =>
    push(cx + Math.cos(angle) * dist, cy + Math.sin(angle) * dist, state.pointer, radius, 26);

  ctx.strokeStyle = state.fg;
  ctx.lineCap = "round";

  // the dial draws itself clockwise from 12
  ctx.globalAlpha = alpha * 0.8;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  const segments = 180;
  const drawn = segments * e;
  for (let k = 0; k <= Math.ceil(drawn); k++) {
    const angle = -Math.PI / 2 + (Math.min(k, drawn) / segments) * Math.PI * 2;
    const [x, y] = at(angle, r);
    if (k === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  for (let k = 0; k < 60 && k / 60 <= e; k++) {
    const hour = k % 5 === 0;
    const angle = -Math.PI / 2 + (k / 60) * Math.PI * 2;
    const [x1, y1] = at(angle, r * (hour ? 0.86 : 0.93));
    const [x2, y2] = at(angle, r * 0.97);
    ctx.globalAlpha = alpha * (hour ? 1 : 0.45);
    ctx.lineWidth = hour ? 2 : 1;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  // hands keep real-ish time: the long one turns every ~7s
  ctx.strokeStyle = state.accent;
  ctx.fillStyle = state.accent;
  ctx.globalAlpha = Math.min(1, alpha * 1.4);
  const hands: [angle: number, length: number, width: number][] = [
    [t * 0.0009 - Math.PI / 2, r * 0.78, 2.5],
    [t * 0.000075 + Math.PI / 6, r * 0.5, 4],
  ];
  for (const [angle, length, width] of hands) {
    const [x, y] = at(angle, length * e);
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawWave(ctx: CanvasRenderingContext2D, state: State, t: number) {
  const p = state.presence.wave;
  if (p < 0.004) return;
  const { width, height } = state;
  const layout = waveLayout(width, height);
  const alpha = baseAlpha(state, 0.75, 0.4) * p;
  const reveal = easeOutCubic(p) * (width + 40) - 20;
  const radius = width < MOBILE_BREAKPOINT ? 80 : 130;
  ctx.lineCap = "round";

  // five lines flow together; the middle one carries the accent
  for (let line = -2; line <= 2; line++) {
    ctx.strokeStyle = line === 0 ? state.accent : state.fg;
    ctx.lineWidth = line === 0 ? 2 : 1.2;
    ctx.globalAlpha = alpha * (line === 0 ? 1 : 0.75 - Math.abs(line) * 0.18);
    ctx.beginPath();
    for (let x = -20; x <= reveal; x += 6) {
      const [px, py] = push(x, waveY(x, width, t, layout, line), state.pointer, radius, 34);
      if (x === -20) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }
}

function draw(ctx: CanvasRenderingContext2D, state: State, t: number) {
  ctx.clearRect(0, 0, state.width, state.height);
  drawClock(ctx, state, t);
  drawWave(ctx, state, t);
}

export interface BackdropProps {
  scene: ChapterId;
  /** drawings stay hidden until active (after the intro) */
  active: boolean;
  reducedMotion: boolean;
}

/**
 * Fixed canvas behind the page with one continuous line drawing per chapter:
 * a ticking clock for Impact and a flowing wave for Path. Each draws itself on
 * when its chapter arrives and bends away from the cursor.
 */
export default function Backdrop({ scene, active, reducedMotion }: BackdropProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const propsRef = useRef({ scene, active });
  propsRef.current = { scene, active };
  const syncRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d") ?? null;
    if (!canvas || !ctx) return;

    const state: State = {
      width: window.innerWidth,
      height: window.innerHeight,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      presence: { clock: 0, wave: 0 },
      target: { clock: 0, wave: 0 },
      pointer: { x: -9999, y: -9999, strength: 0, active: false },
      fg: "#eee",
      accent: "#4785ff",
      light: false,
    };

    const applySize = () => {
      canvas.width = Math.round(state.width * state.dpr);
      canvas.height = Math.round(state.height * state.dpr);
      canvas.style.width = `${state.width}px`;
      canvas.style.height = `${state.height}px`;
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    };
    applySize();

    const readColors = () => {
      state.fg = readColor("--foreground", state.fg);
      state.accent = readColor("--accent", state.accent);
      state.light = !document.documentElement.classList.contains("dark");
    };
    readColors();

    const staticFrame = () => {
      state.presence = { ...state.target };
      draw(ctx, state, 0);
    };

    const sync = () => {
      const { scene: current, active: on } = propsRef.current;
      const drawing = on ? DRAWING[current] : undefined;
      state.target = { clock: drawing === "clock" ? 1 : 0, wave: drawing === "wave" ? 1 : 0 };
      if (reducedMotion) staticFrame();
    };
    syncRef.current = sync;
    sync();

    let frame = 0;
    const tick = (t: number) => {
      frame = requestAnimationFrame(tick);
      for (const key of ["clock", "wave"] as const) {
        // leave faster than arrive, so the next chapter's drawing isn't crowded
        const rate = state.target[key] > state.presence[key] ? 0.05 : 0.09;
        state.presence[key] += (state.target[key] - state.presence[key]) * rate;
      }
      const { pointer } = state;
      pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * 0.08;
      draw(ctx, state, t);
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
      state.pointer.x = e.clientX;
      state.pointer.y = e.clientY;
      state.pointer.active = true;
    };
    const onPointerOut = (e: PointerEvent) => {
      if (e.type === "pointerup" && e.pointerType === "mouse") return;
      state.pointer.active = false;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerOut, { passive: true });
    window.addEventListener("pointercancel", onPointerOut, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerOut);

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        state.width = window.innerWidth;
        state.height = window.innerHeight;
        state.dpr = Math.min(window.devicePixelRatio || 1, 2);
        applySize();
        if (reducedMotion) staticFrame();
      }, 140);
    };
    window.addEventListener("resize", onResize);

    const themeObserver = new MutationObserver(() => {
      readColors();
      if (reducedMotion) staticFrame();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      stop();
      window.clearTimeout(resizeTimer);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerOut);
      window.removeEventListener("pointercancel", onPointerOut);
      document.documentElement.removeEventListener("pointerleave", onPointerOut);
      window.removeEventListener("resize", onResize);
      themeObserver.disconnect();
      syncRef.current = null;
    };
  }, [reducedMotion]);

  useEffect(() => {
    syncRef.current?.();
  }, [scene, active]);

  return (
    <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-0" />
  );
}
