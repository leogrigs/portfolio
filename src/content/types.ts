export type Locale = "pt" | "en";

export const CHAPTER_IDS = ["home", "impact", "path", "contact"] as const;

export type ChapterId = (typeof CHAPTER_IDS)[number];

/**
 * Text fields marked as "rich" accept `*emphasis*` markers, rendered in the
 * italic serif. Everything else is plain text.
 */
export interface Content {
  meta: {
    title: string;
    description: string;
    skip: string;
  };
  nav: {
    chapters: Record<ChapterId, string>;
    chapterNav: string;
    resume: string;
    switchLanguage: string;
    switchLanguageShort: string;
    theme: { toDark: string; toLight: string };
  };
  intro: {
    caption: string;
  };
  hero: {
    name: string;
    /** drawn by the particle field; decorative */
    particleLines: string[];
    /** rich */
    tagline: string;
    facts: string[];
    scroll: string;
  };
  impact: {
    /** rich */
    title: string;
    beforeLabel: string;
    afterLabel: string;
    steps: {
      before: string;
      after: string;
      context: string;
      where: string;
      /** after / before, used to size the "after" bar (0..1) */
      ratio: number;
    }[];
  };
  path: {
    /** big label shown instead of the year on the current role */
    nowLabel: string;
    sinceLabel: string;
    milestones: {
      year: string;
      company: string;
      role: string;
      place: string;
      story: string;
      current?: boolean;
    }[];
    stackLabel: string;
    stack: string[];
  };
  contact: {
    particleWord: string;
    emailLabel: string;
    copy: string;
    copied: string;
    links: { linkedin: string; github: string; resume: string };
    clockLabel: string;
    backToTop: string;
  };
}
