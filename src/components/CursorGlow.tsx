import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useEffect, useRef } from "react";

/**
 * A soft accent-coloured light that trails the mouse across the page. Only on
 * devices with a real hover pointer, and not with reduced motion.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const enabled = finePointer && !reduced;

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2, shown: 0 };
    const pos = { ...target };
    let frame = 0;

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.16;
      pos.y += (target.y - pos.y) * 0.16;
      pos.shown += (target.shown - pos.shown) * 0.08;
      el.style.setProperty("--x", `${pos.x.toFixed(1)}px`);
      el.style.setProperty("--y", `${pos.y.toFixed(1)}px`);
      el.style.opacity = pos.shown.toFixed(3);
      const settled =
        Math.abs(target.x - pos.x) < 0.3 &&
        Math.abs(target.y - pos.y) < 0.3 &&
        Math.abs(target.shown - pos.shown) < 0.005;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.x = e.clientX;
      target.y = e.clientY;
      if (!target.shown) {
        // appear where the mouse is instead of sliding in from the last spot
        pos.x = target.x;
        pos.y = target.y;
      }
      target.shown = 1;
      start();
    };
    const onLeave = () => {
      target.shown = 0;
      start();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div
      ref={ref}
      aria-hidden
      style={{ opacity: 0 }}
      className="cursor-glow pointer-events-none fixed inset-0 z-[1]"
    />
  );
}
