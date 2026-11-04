import type { Locale } from "@/content";

export const LOCALE_STORAGE_KEY = "portfolio-locale";

function readStoredLocale(): Locale | null {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    return stored === "pt" || stored === "en" ? stored : null;
  } catch {
    return null;
  }
}

export function detectLocale(): Locale {
  const stored = readStoredLocale();
  if (stored) return stored;
  const languages =
    typeof navigator !== "undefined"
      ? navigator.languages?.length
        ? navigator.languages
        : [navigator.language]
      : [];
  return languages.some((lang) => lang?.toLowerCase().startsWith("pt"))
    ? "pt"
    : "en";
}
