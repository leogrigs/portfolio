import { createContext, useContext } from "react";
import { CONTENT, type Content, type Locale } from "@/content";

export interface LocaleState {
  locale: Locale;
  content: Content;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

export const LocaleContext = createContext<LocaleState>({
  locale: "en",
  content: CONTENT.en,
  setLocale: () => undefined,
  toggleLocale: () => undefined,
});

export const useLocale = () => useContext(LocaleContext);

export const useContent = () => useContext(LocaleContext).content;
