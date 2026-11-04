import { parseRich } from "@/lib/rich";
import { cn, EASE_OUT } from "@/lib/utils";
import { motion, type Variants } from "framer-motion";
import { Fragment, useMemo } from "react";

const container: Variants = {
  hidden: {},
  show: ({ stagger, delay }: { stagger: number; delay: number }) => ({
    transition: { staggerChildren: stagger, delayChildren: delay },
  }),
};

const word: Variants = {
  hidden: { y: "112%" },
  show: { y: "0%", transition: { duration: 0.95, ease: EASE_OUT } },
};

interface RiseTextProps {
  text: string;
  className?: string;
  as?: "p" | "h1" | "h2" | "h3";
  stagger?: number;
  delay?: number;
  /** when provided, plays on this flag instead of on scroll into view */
  play?: boolean;
}

/**
 * Each word rises from behind a mask. Supports `*emphasis*` markers.
 */
export function RiseText({
  text,
  className,
  as = "p",
  stagger = 0.045,
  delay = 0,
  play,
}: RiseTextProps) {
  const words = useMemo(() => parseRich(text), [text]);
  const Tag = motion[as];
  const trigger =
    play === undefined
      ? { whileInView: "show", viewport: { once: true, amount: 0.5 } }
      : { animate: play ? "show" : "hidden" };

  return (
    <Tag
      className={className}
      variants={container}
      custom={{ stagger, delay }}
      initial="hidden"
      {...trigger}
    >
      {words.map((w, i) => (
        <Fragment key={`${w.text}-${i}`}>
          {i > 0 && !w.glue && " "}
          <span className="-mx-[0.06em] inline-block overflow-hidden px-[0.06em] pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className={cn(
                "inline-block",
                w.em && "font-serif italic font-normal text-accent"
              )}
              variants={word}
            >
              {w.text}
            </motion.span>
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}
