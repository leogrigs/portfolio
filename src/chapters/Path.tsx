import { ChapterHeader } from "@/components/ChapterHeader";
import { Marquee } from "@/components/Marquee";
import type { Content } from "@/content";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useContent } from "@/i18n/context";
import { cn, EASE_OUT } from "@/lib/utils";
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

type Milestones = Content["path"]["milestones"];
type MilestoneData = Milestones[number];

const YEAR_CLASS =
  "font-display text-[clamp(4.5rem,9vw,9rem)] font-medium leading-none tracking-tighter";

interface Labels {
  now: string;
  since: string;
}

/** the current role shows "Now" instead of a start year that keeps aging */
function label(m: MilestoneData, labels: Labels) {
  return m.current ? labels.now : m.year;
}

function MilestoneBody({ m, labels }: { m: MilestoneData; labels: Labels }) {
  return (
    <>
      <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        {m.current && (
          <span aria-hidden className="live-dot size-1.5 rounded-full bg-accent" />
        )}
        {m.current ? `${labels.since} ${m.year} · ${m.place}` : m.place}
      </p>
      <h3 className="mt-3 font-display text-2xl tracking-tight md:text-3xl">
        {m.company}
      </h3>
      <p className="mt-1 text-accent">{m.role}</p>
      <p className="mt-4 max-w-[36ch] text-muted md:text-[1.05rem] md:leading-relaxed">
        {m.story}
      </p>
    </>
  );
}

function TrackMilestone({
  m,
  progress,
  start,
  end,
  labels,
}: {
  m: MilestoneData;
  progress: MotionValue<number>;
  start: number;
  end: number;
  labels: Labels;
}) {
  const lit = useTransform(progress, [start - 0.06, start], [0, 1]);
  const yearClip = useTransform(lit, (v) => `inset(0 ${100 - v * 100}% 0 0)`);
  const dotScale = useTransform(lit, [0, 1], [0.5, 1]);
  const bodyOpacity = useTransform(lit, [0, 1], [0.28, 1]);
  const line = useTransform(progress, [start, end], [0, 1]);

  return (
    <li className="relative flex w-[34vw] max-w-[30rem] shrink-0 flex-col pr-12 lg:w-[28vw]">
      <div className="relative">
        <span aria-hidden className={cn(YEAR_CLASS, "text-outline")}>
          {label(m, labels)}
        </span>
        <motion.span
          style={{ clipPath: yearClip }}
          className={cn(YEAR_CLASS, "absolute inset-0")}
        >
          {label(m, labels)}
        </motion.span>
      </div>

      <div aria-hidden className="relative my-8 h-3">
        <span className="absolute inset-x-0 top-1/2 h-px bg-line" />
        <motion.span
          style={{ scaleX: line }}
          className="absolute inset-x-0 top-1/2 h-px origin-left bg-accent"
        />
        <motion.span
          style={{ scale: dotScale }}
          className="absolute left-0 top-1/2 size-3 -translate-y-1/2 rounded-full bg-accent ring-4 ring-background"
        />
      </div>

      <motion.div style={{ opacity: bodyOpacity }}>
        <MilestoneBody m={m} labels={labels} />
      </motion.div>
    </li>
  );
}

function HorizontalPath({ milestones, labels }: { milestones: Milestones; labels: Labels }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const [distance, setDistance] = useState(0);
  const [stops, setStops] = useState<number[]>(() =>
    milestones.map((_, i) => i / Math.max(milestones.length - 1, 1))
  );
  const distanceValue = useMotionValue(0);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const vw = window.innerWidth;
      const d = Math.max(0, track.scrollWidth - vw);
      setDistance(d);
      distanceValue.set(d);
      const items = Array.from(track.children) as HTMLElement[];
      if (d > 0 && items.length) {
        // each milestone lights up when its dot reaches 40% of the viewport
        setStops(
          items.map((el) =>
            Math.min(1, Math.max(0, (el.offsetLeft - vw * 0.4) / d))
          )
        );
      }
    };
    measure();
    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    observer?.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [milestones, distanceValue]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(
    [scrollYProgress, distanceValue],
    ([p, d]: number[]) => -p * d
  );

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <motion.ol
          ref={trackRef}
          style={{ x }}
          className="flex w-max pl-10 pr-[38vw]"
        >
          {milestones.map((m, i) => (
            <TrackMilestone
              key={`${m.company}-${m.year}`}
              m={m}
              progress={scrollYProgress}
              start={stops[i]}
              end={stops[i + 1] ?? 1}
              labels={labels}
            />
          ))}
        </motion.ol>
      </div>
    </div>
  );
}

function VerticalPath({ milestones, labels }: { milestones: Milestones; labels: Labels }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.6"],
  });

  return (
    <ol ref={ref} className="relative mx-5 mt-16 md:mx-10">
      <span aria-hidden className="absolute bottom-2 left-[5px] top-3 w-px bg-line">
        <motion.span
          style={reduced ? undefined : { scaleY: scrollYProgress }}
          className="absolute inset-0 origin-top bg-accent"
        />
      </span>
      {milestones.map((m) => (
        <motion.li
          key={`${m.company}-${m.year}`}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="relative pb-16 pl-10 last:pb-0"
        >
          <span
            aria-hidden
            className="absolute left-0 top-5 size-[11px] rounded-full bg-accent ring-4 ring-background"
          />
          <span className="font-display text-6xl font-medium leading-none tracking-tighter">
            {label(m, labels)}
          </span>
          <div className="mt-5">
            <MilestoneBody m={m} labels={labels} />
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

export default function Path() {
  const { path, nav } = useContent();
  const reduced = useReducedMotion();
  const wide = useMediaQuery("(min-width: 768px)");
  const horizontal = wide && !reduced;
  const labels = { now: path.nowLabel, since: path.sinceLabel };

  return (
    <section id="path" aria-labelledby="path-title" className="relative z-10">
      <div className="px-5 pt-28 md:px-10 md:pt-36">
        <ChapterHeader index={2} id="path-title" title={nav.chapters.path} />
      </div>

      {horizontal ? (
        <HorizontalPath milestones={path.milestones} labels={labels} />
      ) : (
        <VerticalPath milestones={path.milestones} labels={labels} />
      )}

      <div className="pb-28 pt-24 md:pb-36 md:pt-16">
        <div className="px-5 md:px-10">
          <Marquee items={path.stack} label={path.stackLabel} />
        </div>
      </div>
    </section>
  );
}
