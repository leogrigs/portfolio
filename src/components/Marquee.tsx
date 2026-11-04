import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

function Row({
  items,
  outline,
  hidden,
}: {
  items: string[];
  outline?: boolean;
  hidden?: boolean;
}) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-6 pr-6 md:gap-10 md:pr-10"
    >
      {items.map((item) => (
        <li key={item} className="flex items-center gap-6 md:gap-10">
          <span
            className={cn(
              "whitespace-nowrap font-display text-5xl tracking-tight md:text-8xl",
              outline && "text-outline"
            )}
          >
            {item}
          </span>
          <span aria-hidden className="size-2 rounded-full bg-accent md:size-3" />
        </li>
      ))}
    </ul>
  );
}

/** Two infinite rows that skew with scroll velocity. */
export function Marquee({ items, label }: { items: string[]; label: string }) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 300 });
  const skewX = useTransform(smooth, [-2500, 2500], [7, -7], { clamp: true });

  if (reduced) {
    return (
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          {label}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {items.map((item) => (
            <li key={item} className="rounded-full border border-line px-4 py-1.5">
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)];

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
        {label}
      </p>
      <motion.div
        style={{ skewX }}
        className="mt-8 flex flex-col gap-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] md:gap-6"
      >
        {rows.map((row, r) => (
          <div key={r} className="flex overflow-hidden">
            <div
              className={cn(
                "flex shrink-0 animate-marquee",
                r === 1 && "[animation-direction:reverse]"
              )}
            >
              <Row items={row} outline={r === 1} />
              <Row items={row} outline={r === 1} hidden />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
