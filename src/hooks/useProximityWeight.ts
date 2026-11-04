import { useEffect, type RefObject } from "react";

interface ProximityOptions {
  enabled: boolean;
  /** weight right under the pointer */
  min?: number;
  /** weight away from it */
  max?: number;
}

/**
 * Thins the letters (`[data-letter]`) closest to the mouse. When the mouse is
 * away from the word (or there is none), a slow invisible "ghost" crosses it instead, so it keeps
 * moving on touch screens and while the visitor just reads. The point and its
 * strength are also exposed as `--mx`, `--my` and `--rim` for the outline light.
 */
export function useProximityWeight(
  ref: RefObject<HTMLElement>,
  { enabled, min = 300, max = 900 }: ProximityOptions
) {
  useEffect(() => {
    const root = ref.current;
    if (!enabled || !root) return;

    let frame = 0;
    let visible = typeof IntersectionObserver === "undefined";
    const pointer = { x: 0, y: 0, inside: false };
    const focus = { x: Number.NaN, y: Number.NaN };
    let rim = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.inside = true;
    };
    const onLeave = () => {
      pointer.inside = false;
    };

    const tick = (t: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      frame = requestAnimationFrame(tick);

      const box = root.getBoundingClientRect();
      if (!box.width || !box.height) return;
      // the mouse takes over while it is in the word's band of the page
      const near =
        pointer.inside &&
        pointer.y > box.top - box.height * 1.2 &&
        pointer.y < box.bottom + box.height * 1.2;
      const tx = near ? pointer.x : box.left + box.width * (0.5 + 0.62 * Math.sin(t * 0.00042));
      const ty = near ? pointer.y : box.top + box.height / 2;
      if (Number.isNaN(focus.x)) {
        focus.x = tx;
        focus.y = ty;
      }
      focus.x += (tx - focus.x) * 0.12;
      focus.y += (ty - focus.y) * 0.12;
      // the outline light is brightest under the real mouse and dimmer on the idle ghost
      rim += ((near ? 1 : 0.5) - rim) * 0.06;
      root.style.setProperty("--mx", `${(focus.x - box.left).toFixed(1)}px`);
      root.style.setProperty("--my", `${(focus.y - box.top).toFixed(1)}px`);
      root.style.setProperty("--rim", rim.toFixed(3));

      // read every rect first, then write, so the browser lays out once per frame
      const letters = Array.from(root.querySelectorAll<HTMLElement>("[data-letter]"));
      const rects = letters.map((el) => el.getBoundingClientRect());
      const radius = box.height * 0.9;
      letters.forEach((el, i) => {
        const r = rects[i];
        if (!r.width) return;
        const d = Math.hypot(r.left + r.width / 2 - focus.x, r.top + r.height / 2 - focus.y);
        const f = Math.max(0, 1 - d / radius);
        const eased = f * f * (3 - 2 * f);
        el.style.setProperty("--wght", String(Math.round(max - (max - min) * eased)));
      });
    };

    const start = () => {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            start();
          })
        : null;
    observer?.observe(root);
    start();

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", start);

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", start);
      root
        .querySelectorAll<HTMLElement>("[data-letter]")
        .forEach((el) => el.style.removeProperty("--wght"));
      for (const name of ["--mx", "--my", "--rim"]) root.style.removeProperty(name);
    };
  }, [ref, enabled, min, max]);
}
