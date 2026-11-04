import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";
import type { Locale } from "../src/content";
import { LocaleProvider } from "../src/i18n/LocaleProvider";
import { ThemeProvider } from "../src/providers/theme-provider";

export function renderWithProviders(
  ui: ReactElement,
  { locale = "en", ...options }: RenderOptions & { locale?: Locale } = {}
) {
  return render(
    <ThemeProvider defaultTheme="dark" storageKey="test-theme">
      <LocaleProvider initialLocale={locale}>{ui}</LocaleProvider>
    </ThemeProvider>,
    options
  );
}

/** Makes every `matchMedia` query in the predicate report a match. */
export function mockMatchMedia(matches: (query: string) => boolean) {
  const original = window.matchMedia;
  window.matchMedia = (query: string) =>
    ({
      matches: matches(query),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
  return () => {
    window.matchMedia = original;
  };
}

export const REDUCED_MOTION = (query: string) =>
  query.includes("prefers-reduced-motion");
