import { CONTENT, type Locale } from "@/content";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { LocaleContext } from "./context";
import { detectLocale, LOCALE_STORAGE_KEY } from "./detect";

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(
    () => initialLocale ?? detectLocale()
  );

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // storage can be unavailable (private mode); the choice still applies
    }
  }, []);

  const toggleLocale = useCallback(
    () => setLocale(locale === "pt" ? "en" : "pt"),
    [locale, setLocale]
  );

  const content = CONTENT[locale];

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
    document.title = content.meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", content.meta.description);
  }, [locale, content]);

  const value = useMemo(
    () => ({ locale, content, setLocale, toggleLocale }),
    [locale, content, setLocale, toggleLocale]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}
