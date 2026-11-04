import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import Contact from "./chapters/Contact";
import Hero from "./chapters/Hero";
import Impact from "./chapters/Impact";
import Path from "./chapters/Path";
import { Intro } from "./components/Intro";
import { Nav } from "./components/Nav";
import Backdrop from "./components/Backdrop";
import { CursorGlow } from "./components/CursorGlow";
import { CHAPTER_IDS } from "./content";
import { useChapter } from "./hooks/useChapter";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useContent } from "./i18n/context";
import { LocaleProvider } from "./i18n/LocaleProvider";
import { ThemeProvider } from "./providers/theme-provider";

export const INTRO_STORAGE_KEY = "portfolio-intro-seen";

function shouldPlayIntro(reduced: boolean) {
  if (reduced) return false;
  try {
    return sessionStorage.getItem(INTRO_STORAGE_KEY) !== "1";
  } catch {
    return true;
  }
}

function Site() {
  const content = useContent();
  const reduced = useReducedMotion();
  const [introVisible, setIntroVisible] = useState(() => shouldPlayIntro(reduced));
  const chapter = useChapter(CHAPTER_IDS);
  const ready = !introVisible;

  const finishIntro = useCallback(() => {
    setIntroVisible(false);
    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    } catch {
      // the intro simply plays again next time
    }
  }, []);

  useEffect(() => {
    if (!introVisible) return;
    // a fresh visit always starts at the top, so the intro hands off to the hero
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = "";
    };
  }, [introVisible]);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#impact"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        {content.meta.skip}
      </a>

      <AnimatePresence>
        {introVisible && <Intro key="intro" onDone={finishIntro} />}
      </AnimatePresence>

      <Backdrop scene={chapter} active={ready} reducedMotion={reduced} />
      <CursorGlow />
      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[5]" />

      <Nav active={chapter} />

      <main>
        <Hero ready={ready} />
        <Impact />
        <Path />
        <Contact />
      </main>

      <Analytics />
    </MotionConfig>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <LocaleProvider>
        <Site />
      </LocaleProvider>
    </ThemeProvider>
  );
}
