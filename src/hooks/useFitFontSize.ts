import { useLayoutEffect, useState, type RefObject } from "react";

interface FitOptions {
  /** share of the element's width the widest word may fill */
  ratio: number;
  /** cap as a share of the viewport height */
  maxViewportHeight: number;
}

/**
 * Font size in px at which the widest of `words` fits the element, measured
 * with the element's own font. Null until it can be measured (no layout, as in
 * tests), so callers keep a CSS fallback size.
 */
export function useFitFontSize(
  ref: RefObject<HTMLElement>,
  words: string[],
  { ratio, maxViewportHeight }: FitOptions
) {
  const [size, setSize] = useState<number | null>(null);
  const key = words.join("\n");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;

    const measure = () => {
      if (cancelled) return;
      const probe = document.createElement("span");
      probe.setAttribute("data-letter", "");
      probe.style.cssText =
        "position:absolute;left:0;top:0;visibility:hidden;white-space:nowrap;font-size:100px;--wght:900";
      el.appendChild(probe);
      let widest = 0;
      for (const word of key.split("\n")) {
        probe.textContent = word;
        widest = Math.max(widest, probe.getBoundingClientRect().width);
      }
      probe.remove();
      const available = el.clientWidth * ratio;
      if (!widest || !available) return;
      const next = Math.min((available / widest) * 100, window.innerHeight * maxViewportHeight);
      setSize(Math.round(next * 10) / 10);
    };

    measure();
    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    observer?.observe(el);
    // the display font arrives after first paint; measure again once it does
    document.fonts?.ready.then(measure);
    document.fonts?.addEventListener?.("loadingdone", measure);

    return () => {
      cancelled = true;
      observer?.disconnect();
      document.fonts?.removeEventListener?.("loadingdone", measure);
    };
  }, [ref, key, ratio, maxViewportHeight]);

  return size;
}
