import { en } from "./en";
import { pt } from "./pt";
import type { Content, Locale } from "./types";

export const CONTENT: Record<Locale, Content> = { pt, en };

export { LINKS } from "./links";
export { CHAPTER_IDS } from "./types";
export type { ChapterId, Content, Locale } from "./types";
