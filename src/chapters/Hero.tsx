import { RiseText } from "@/components/text/RiseText";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useContent } from "@/i18n/context";
import { EASE_OUT } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero({
  ready,
  particlesOn,
}: {
  ready: boolean;
  /** null while unknown; false when the canvas is unavailable and the word must be text */
  particlesOn: boolean | null;
}) {
  const { hero } = useContent();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -90]);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: { duration: 0.9, ease: EASE_OUT, delay },
  });

  return (
    <section
      id="home"
      ref={ref}
      className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-8 md:px-10 md:pb-10"
    >
      {/* the particle field draws this word; show it as type when canvas is unavailable */}
      {particlesOn === false && (
        <p
          aria-hidden
          className="absolute inset-x-5 top-[24%] text-center font-display text-[17vw] font-bold uppercase leading-none tracking-tighter md:inset-x-10 md:top-[22%] md:text-[13vw]"
        >
          {hero.particleLines.join(" ")}
        </p>
      )}

      <motion.div
        style={reduced ? undefined : { opacity, y }}
        className="grid gap-8 md:grid-cols-12 md:items-end"
      >
        <div className="md:col-span-7">
          <motion.h1
            {...fade(0.1)}
            className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground md:text-xs"
          >
            <span aria-hidden className="live-dot size-1.5 rounded-full bg-accent" />
            {hero.name}
          </motion.h1>
          <RiseText
            text={hero.tagline}
            play={ready}
            delay={0.25}
            stagger={0.035}
            className="mt-4 max-w-[22ch] text-balance font-display text-[1.75rem] leading-[1.06] tracking-tight md:text-[3.2rem]"
          />
        </div>

        <div className="flex items-end justify-between gap-6 md:col-span-5 md:flex-col">
          <motion.ul
            {...fade(0.55)}
            className="flex flex-col gap-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:items-end"
          >
            {hero.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </motion.ul>
          <motion.a
            {...fade(0.7)}
            href="#impact"
            aria-label={hero.scroll}
            className="group flex shrink-0 items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em]"
          >
            <span aria-hidden className="hidden sm:inline">
              {hero.scroll}
            </span>
            <span
              aria-hidden
              className="relative block h-10 w-px overflow-hidden bg-line"
            >
              <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-line bg-foreground" />
            </span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
