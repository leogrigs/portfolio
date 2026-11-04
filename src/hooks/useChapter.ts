import { useEffect, useState } from "react";

/**
 * Returns the id of the section that currently crosses the given viewport
 * line (default: the middle of the screen). Works with very tall, pinned
 * sections, where intersection ratios are unreliable.
 */
export function useChapter<T extends string>(
  ids: readonly T[],
  line = 0.5
): T {
  const [active, setActive] = useState<T>(ids[0]);

  useEffect(() => {
    let frame = 0;

    const compute = () => {
      frame = 0;
      const y = window.innerHeight * line;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= y) current = id;
      }
      setActive((prev) => (prev === current ? prev : current));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ids, line]);

  return active;
}
