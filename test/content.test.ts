import { CHAPTER_IDS, CONTENT } from "../src/content";

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => [k, shape(v)])
    );
  }
  return typeof value;
}

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

describe("content", () => {
  it("has the same structure in Portuguese and English", () => {
    expect(shape(CONTENT.pt)).toEqual(shape(CONTENT.en));
  });

  it("names every chapter in both languages", () => {
    for (const locale of ["pt", "en"] as const) {
      expect(Object.keys(CONTENT[locale].nav.chapters).sort()).toEqual(
        [...CHAPTER_IDS].sort()
      );
    }
  });

  it("keeps emphasis markers balanced", () => {
    for (const locale of ["pt", "en"] as const) {
      for (const text of strings(CONTENT[locale])) {
        expect((text.match(/\*/g) ?? []).length % 2, text).toBe(0);
      }
    }
  });

  it("uses before/after ratios between 0 and 1", () => {
    for (const step of CONTENT.en.impact.steps) {
      expect(step.ratio).toBeGreaterThanOrEqual(0);
      expect(step.ratio).toBeLessThanOrEqual(1);
    }
  });

  it("marks only the latest role as current", () => {
    for (const locale of ["pt", "en"] as const) {
      const { milestones } = CONTENT[locale].path;
      expect(milestones.filter((m) => m.current)).toHaveLength(1);
      expect(milestones.at(-1)?.current).toBe(true);
    }
  });

  it("keeps facts identical across languages", () => {
    const years = (locale: "pt" | "en") =>
      CONTENT[locale].path.milestones.map((m) => `${m.year} ${m.company}`);
    expect(years("pt")).toEqual(years("en"));
  });
});
