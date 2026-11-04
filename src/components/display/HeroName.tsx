import { useFitFontSize } from "@/hooks/useFitFontSize";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useProximityWeight } from "@/hooks/useProximityWeight";
import { setHeroWord } from "@/lib/heroWord";
import { cn, EASE_IN_OUT } from "@/lib/utils";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Letters } from "./Letters";

/** each word stays this long before the next one wipes in */
export const NAME_HOLD_MS = 4500;
const WIPE_SECONDS = 1.1;
/** how far (in % of the width) the wipe edge leans across the word, like a forward slash */
const SLANT = 5;
/** width (in %) of the band lit in the accent colour right behind the edge */
const BAND = 7;

const edgeAt = (p: number) => p * (100 + SLANT + BAND);

const clipIncoming = (p: number) => {
  const a = edgeAt(p);
  return `polygon(-1% 0, ${a}% 0, ${a - SLANT}% 100%, -1% 100%)`;
};
const clipOutgoing = (p: number) => {
  const a = edgeAt(p);
  return `polygon(${a}% 0, 101% 0, 101% 100%, ${a - SLANT}% 100%)`;
};
const clipBand = (p: number) => {
  const a = edgeAt(p);
  return `polygon(${a - BAND}% 0, ${a}% 0, ${a - SLANT}% 100%, ${a - SLANT - BAND}% 100%)`;
};

const LAYER = "col-start-1 row-start-1 w-full whitespace-nowrap py-[0.08em] text-center";

/**
 * The name in big display type. It cycles through `words`: each new word wipes
 * in from the left behind a slanted band of accent colour. Near the pointer (or
 * a slow idle ghost) letters thin out and their outline lights up in the accent.
 */
export function HeroName({
  words,
  ready,
  motionOn,
}: {
  words: string[];
  /** false while the intro covers the page; the first word wipes in when it turns true */
  ready: boolean;
  /** false with reduced motion: one static word */
  motionOn: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const wide = useMediaQuery("(min-width: 768px)");
  const fontSize = useFitFontSize(ref, words, {
    ratio: wide ? 0.6 : 0.84,
    maxViewportHeight: 0.2,
  });
  const [{ index, prev }, setWords] = useState<{ index: number; prev: number | null }>({
    index: 0,
    prev: null,
  });
  const edge = useMotionValue(motionOn ? 0 : 1);
  const incoming = useTransform(edge, clipIncoming);
  const outgoing = useTransform(edge, clipOutgoing);
  const band = useTransform(edge, clipBand);
  useProximityWeight(ref, { enabled: motionOn && ready });

  // first word: revealed by the same wipe once the intro hands over
  useEffect(() => {
    if (!motionOn) {
      edge.set(1);
      return;
    }
    if (!ready) return;
    const controls = animate(edge, 1, { duration: WIPE_SECONDS, ease: EASE_IN_OUT, delay: 0.1 });
    return () => controls.stop();
  }, [ready, motionOn, edge]);

  useEffect(() => {
    if (!motionOn || !ready || words.length < 2) return;
    const id = window.setInterval(() => {
      setWords((s) => ({ index: (s.index + 1) % words.length, prev: s.index }));
    }, NAME_HOLD_MS);
    return () => window.clearInterval(id);
  }, [motionOn, ready, words.length]);

  // layout effect: hide the new word before the first paint, or it flashes in whole
  useLayoutEffect(() => {
    setHeroWord(index);
    if (prev === null) return;
    edge.set(0);
    const controls = animate(edge, 1, { duration: WIPE_SECONDS, ease: EASE_IN_OUT });
    return () => controls.stop();
  }, [index, prev, edge]);

  useEffect(() => () => setHeroWord(0), []);

  return (
    <div
      ref={ref}
      aria-hidden
      data-testid="hero-name"
      style={fontSize ? { fontSize } : undefined}
      className="grid select-none font-name text-[10vw] leading-[0.86] [--wdth:100] sm:[--wdth:125] md:text-[7vw]"
    >
      {prev !== null && (
        <motion.div key={`out-${prev}`} style={{ clipPath: outgoing }} className={LAYER}>
          <Letters word={words[prev]} />
        </motion.div>
      )}
      <motion.div key={`in-${index}`} style={{ clipPath: incoming }} className={LAYER}>
        <Letters word={words[index]} />
      </motion.div>
      {/* blue outline lit only around the pointer; follows the incoming word through the wipe */}
      <motion.div
        key={`rim-${index}`}
        style={{ clipPath: incoming }}
        className={cn(LAYER, "rim-light")}
      >
        <Letters word={words[index]} />
      </motion.div>
      <motion.div
        key={`band-${index}`}
        style={{ clipPath: band }}
        className={cn(LAYER, "text-accent")}
      >
        <Letters word={words[index]} />
      </motion.div>
    </div>
  );
}
