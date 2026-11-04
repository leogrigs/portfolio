import { useContent } from "@/i18n/context";
import { EASE_IN_OUT } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1400;

/** Opening counter that wipes away to reveal the page. Click or any key skips it. */
export function Intro({ onDone }: { onDone: () => void }) {
  const { hero, intro } = useContent();
  const [count, setCount] = useState(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    let frame = 0;
    let timer = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION_MS);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) frame = requestAnimationFrame(tick);
      else timer = window.setTimeout(() => doneRef.current(), 220);
    };
    frame = requestAnimationFrame(tick);

    const skip = () => doneRef.current();
    window.addEventListener("keydown", skip);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  return (
    <motion.div
      data-testid="intro"
      aria-hidden
      onClick={onDone}
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
      transition={{ duration: 0.95, ease: EASE_IN_OUT }}
      className="fixed inset-0 z-[70] flex cursor-pointer flex-col justify-between bg-background p-5 md:p-10"
    >
      <div className="flex justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
        <span>{hero.name}</span>
        <span className="text-right">{intro.caption}</span>
      </div>
      <div className="flex items-end gap-6">
        <div className="relative mb-[4vw] h-px flex-1 overflow-hidden bg-line">
          <div
            className="absolute inset-0 origin-left bg-accent"
            style={{ transform: `scaleX(${count / 100})` }}
          />
        </div>
        <span className="font-display text-[26vw] font-medium leading-[0.78] tracking-tighter tabular-nums md:text-[16vw]">
          {count}
        </span>
      </div>
    </motion.div>
  );
}
