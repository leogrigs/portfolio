import { ChapterHeader } from "@/components/ChapterHeader";
import { RiseText } from "@/components/text/RiseText";
import type { Content } from "@/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useContent } from "@/i18n/context";
import { pad } from "@/lib/utils";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

type Steps = Content["impact"]["steps"];
type StepData = Steps[number];

const BEFORE_CLASS =
  "block font-display text-[clamp(3.4rem,14vw,8.5rem)] font-medium leading-[0.9] tracking-tight text-muted md:text-[clamp(3.4rem,9.5vw,8.5rem)]";
const AFTER_CLASS =
  "block font-serif text-[clamp(3.8rem,16vw,10rem)] italic leading-[0.9] text-accent md:text-[clamp(3.8rem,11.5vw,10rem)]";
const LABEL_CLASS =
  "font-mono text-[11px] uppercase tracking-[0.22em] text-muted";

function StepMeta({ index, total, where }: { index: number; total: number; where: string }) {
  return (
    <p className={LABEL_CLASS}>
      <span className="tabular-nums text-foreground">
        {pad(index + 1)}/{pad(total)}
      </span>{" "}
      · {where}
    </p>
  );
}

function Step({
  step,
  index,
  total,
  progress,
  labels,
}: {
  step: StepData;
  index: number;
  total: number;
  progress: MotionValue<number>;
  labels: { before: string; after: string };
}) {
  const local = useTransform(progress, [index / total, (index + 1) / total], [0, 1]);
  const first = index === 0;
  const last = index === total - 1;
  const opacity = useTransform(local, [0, 0.12, 0.88, 1], [first ? 1 : 0, 1, 1, last ? 1 : 0]);
  const y = useTransform(local, [0, 0.12, 0.88, 1], [first ? 0 : 70, 0, 0, last ? 0 : -70]);
  const strike = useTransform(local, [0.16, 0.38], [0, 1]);
  const beforeOpacity = useTransform(local, [0.16, 0.45], [1, 0.4]);
  const afterOpacity = useTransform(local, [0.3, 0.48], [0, 1]);
  const afterY = useTransform(local, [0.3, 0.52], [50, 0]);
  const bar = useTransform(local, [0.28, 0.66], [1, Math.max(step.ratio, 0.006)]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center md:max-w-[60%]"
    >
      <StepMeta index={index} total={total} where={step.where} />

      <div className="mt-6 md:mt-8">
        <span className={LABEL_CLASS}>{labels.before}</span>
        <div className="relative w-fit">
          <motion.span style={{ opacity: beforeOpacity }} className={BEFORE_CLASS}>
            {step.before}
          </motion.span>
          <motion.span
            aria-hidden
            style={{ scaleX: strike }}
            className="absolute inset-x-[-0.05em] top-[54%] h-[3px] origin-left bg-accent md:h-[5px]"
          />
        </div>
      </div>

      <motion.div style={{ opacity: afterOpacity, y: afterY }} className="mt-3">
        <span className={LABEL_CLASS}>{labels.after}</span>
        <span className={AFTER_CLASS}>{step.after}</span>
      </motion.div>

      <p className="mt-6 max-w-[26ch] font-display text-xl tracking-tight md:text-3xl">
        {step.context}
      </p>

      <div aria-hidden className="mt-6 flex max-w-md flex-col gap-2">
        <span className="h-1.5 rounded-full bg-line" />
        <motion.span
          style={{ scaleX: bar }}
          className="h-1.5 origin-left rounded-full bg-accent"
        />
      </div>
    </motion.div>
  );
}

function RailSegment({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const fill = useTransform(progress, [index / total, (index + 1) / total], [0, 1]);
  return (
    <span className="relative h-px flex-1 overflow-hidden bg-line">
      <motion.span
        style={{ scaleX: fill }}
        className="absolute inset-0 origin-left bg-foreground"
      />
    </span>
  );
}

function PinnedSteps({ steps, labels }: { steps: Steps; labels: { before: string; after: string } }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const total = steps.length;

  return (
    <div ref={ref} className="relative" style={{ height: `${total * 95 + 40}vh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden px-5 md:px-10">
        <div className="relative h-[78svh] w-full md:h-[70svh]">
          {steps.map((step, i) => (
            <Step
              key={i}
              step={step}
              index={i}
              total={total}
              progress={scrollYProgress}
              labels={labels}
            />
          ))}
        </div>
        <div
          aria-hidden
          className="absolute inset-x-5 bottom-8 flex gap-2 md:inset-x-auto md:left-10 md:w-72"
        >
          {steps.map((_, i) => (
            <RailSegment key={i} index={i} total={total} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StaticSteps({ steps, labels }: { steps: Steps; labels: { before: string; after: string } }) {
  return (
    <ol className="mt-20 flex flex-col gap-20 px-5 md:px-10">
      {steps.map((step, i) => (
        <li key={i} className="md:max-w-[60%]">
          <StepMeta index={i} total={steps.length} where={step.where} />
          <p className="mt-6">
            <span className="sr-only">{labels.before}: </span>
            <s className={`${BEFORE_CLASS} decoration-accent`}>{step.before}</s>
            <span className="sr-only">, {labels.after}: </span>
            <span className={AFTER_CLASS}>{step.after}</span>
          </p>
          <p className="mt-6 max-w-[26ch] font-display text-xl tracking-tight md:text-3xl">
            {step.context}
          </p>
        </li>
      ))}
    </ol>
  );
}

export default function Impact() {
  const { impact, nav } = useContent();
  const reduced = useReducedMotion();
  const labels = { before: impact.beforeLabel, after: impact.afterLabel };

  return (
    <section id="impact" aria-labelledby="impact-title" className="relative z-10 pb-16 md:pb-24">
      <div className="px-5 pt-28 md:px-10 md:pt-36">
        <ChapterHeader index={1} id="impact-title" title={nav.chapters.impact} />
        <RiseText
          as="p"
          text={impact.title}
          className="mt-10 max-w-4xl font-display md:max-w-[52%] text-[clamp(2.1rem,5.4vw,5.4rem)] font-medium leading-[1.02] tracking-tight md:mt-14"
        />
      </div>

      {reduced ? (
        <StaticSteps steps={impact.steps} labels={labels} />
      ) : (
        <PinnedSteps steps={impact.steps} labels={labels} />
      )}
    </section>
  );
}
