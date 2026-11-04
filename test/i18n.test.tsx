import { act, render, screen } from "@testing-library/react";
import { useLocale } from "../src/i18n/context";
import { detectLocale, LOCALE_STORAGE_KEY } from "../src/i18n/detect";
import { LocaleProvider } from "../src/i18n/LocaleProvider";

function setLanguages(languages: string[]) {
  Object.defineProperty(navigator, "languages", {
    value: languages,
    configurable: true,
  });
}

function Probe() {
  const { locale, content, toggleLocale } = useLocale();
  return (
    <button type="button" onClick={toggleLocale}>
      {locale}:{content.nav.chapters.impact}
    </button>
  );
}

describe("locale", () => {
  afterEach(() => {
    localStorage.clear();
    setLanguages(["en-US"]);
  });

  it("detects Portuguese from the browser", () => {
    setLanguages(["pt-BR", "en"]);
    expect(detectLocale()).toBe("pt");
  });

  it("falls back to English", () => {
    setLanguages(["de-DE"]);
    expect(detectLocale()).toBe("en");
  });

  it("prefers a stored choice over the browser", () => {
    setLanguages(["pt-BR"]);
    localStorage.setItem(LOCALE_STORAGE_KEY, "en");
    expect(detectLocale()).toBe("en");
  });

  it("toggles language, persists it and updates the document", () => {
    render(
      <LocaleProvider initialLocale="en">
        <Probe />
      </LocaleProvider>
    );
    expect(screen.getByRole("button")).toHaveTextContent("en:Impact");
    expect(document.documentElement.lang).toBe("en");

    act(() => screen.getByRole("button").click());

    expect(screen.getByRole("button")).toHaveTextContent("pt:Impacto");
    expect(document.documentElement.lang).toBe("pt-BR");
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe("pt");
    expect(document.title).toContain("Leonardo Grigorio");
  });
});
