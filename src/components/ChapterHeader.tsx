import { CHAPTER_IDS } from "@/content";
import { cn, EASE_OUT, pad } from "@/lib/utils";
import { motion } from "framer-motion";

const TOTAL = CHAPTER_IDS.length - 1;

export function ChapterHeader({
  index,
  title,
  id,
  className,
}: {
  index: number;
  title: string;
  id: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted md:text-xs",
        className
      )}
    >
      <span className="tabular-nums text-accent">{pad(index)}</span>
      <motion.span
        aria-hidden
        className="h-px w-10 origin-left bg-current md:w-16"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: EASE_OUT }}
      />
      <h2 id={id} className="text-foreground">
        {title}
      </h2>
      <span aria-hidden className="tabular-nums">
        / {pad(TOTAL)}
      </span>
    </div>
  );
}
