import { CHAPTER_IDS, LINKS, type ChapterId } from "@/content";
import { useLocale } from "@/i18n/context";
import { cn, pad } from "@/lib/utils";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const TOTAL = CHAPTER_IDS.length - 1;

export function Nav({ active }: { active: ChapterId }) {
  const { content, toggleLocale } = useLocale();
  const { nav } = content;
  const index = CHAPTER_IDS.indexOf(active);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-accent"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-30 h-32 bg-gradient-to-b from-background from-25% via-background/80 to-transparent"
      />

      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-3 px-5 pt-[max(1.1rem,env(safe-area-inset-top))] md:px-10 md:pt-6">
        <a
          href="#home"
          className="pointer-events-auto flex items-center gap-3"
          aria-label={content.hero.name}
        >
          <span className="grid size-9 place-items-center rounded-full border border-line bg-background/60 font-mono text-[11px] tracking-wider backdrop-blur">
            LG
          </span>
          <span className="hidden text-sm tracking-tight lg:block">
            {content.hero.name}
          </span>
        </a>

        <div
          aria-hidden
          className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          <span className="tabular-nums text-foreground">
            {pad(index)}/{pad(TOTAL)}
          </span>
          <span className="relative block h-4 w-28 overflow-hidden sm:w-36">
            {/* remount on change: an enter-only animation can't get stuck mid-exit on fast scrolls */}
            <motion.span
              key={`${active}-${nav.chapters[active]}`}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 truncate"
            >
              {nav.chapters[active]}
            </motion.span>
          </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleLocale}
            aria-label={nav.switchLanguage}
            title={nav.switchLanguage}
            className="h-9 rounded-full border border-line bg-background/60 px-3 font-mono text-[11px] tracking-wider backdrop-blur transition-colors hover:bg-foreground hover:text-background"
          >
            {nav.switchLanguageShort}
          </button>
          <ThemeToggle />
          <a
            href={LINKS.resume}
            target="_blank"
            rel="noreferrer"
            className="hidden h-9 items-center gap-1 rounded-full bg-foreground px-4 text-sm text-background transition-opacity hover:opacity-85 sm:inline-flex"
          >
            {nav.resume}
            <ArrowUpRight size={14} />
          </a>
        </div>
      </header>

      <nav
        aria-label={nav.chapterNav}
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
      >
        <ol className="flex flex-col items-end gap-2.5">
          {CHAPTER_IDS.map((id) => {
            const isActive = id === active;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "true" : undefined}
                  className="group flex items-center gap-3 py-1"
                >
                  <span
                    className={cn(
                      "font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300",
                      "translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
                      isActive ? "text-foreground" : "text-muted"
                    )}
                  >
                    {nav.chapters[id]}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "h-px transition-all duration-500",
                      isActive
                        ? "w-8 bg-accent"
                        : "w-4 bg-muted/60 group-hover:w-6 group-hover:bg-foreground"
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
