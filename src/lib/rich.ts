export interface RichWord {
  text: string;
  /** rendered with the italic serif accent */
  em: boolean;
  /** attaches to the previous word without a space (e.g. punctuation after an emphasis) */
  glue: boolean;
}

/**
 * Splits text with `*emphasis*` markers into words, keeping track of which
 * words are emphasised and where no space should be rendered.
 */
export function parseRich(text: string): RichWord[] {
  const words: RichWord[] = [];
  const segments = text.split(/(\*[^*]+\*)/g).filter((s) => s.length > 0);
  let prevEndsWithSpace = true;

  for (const segment of segments) {
    const em = segment.length > 2 && segment.startsWith("*") && segment.endsWith("*");
    const body = em ? segment.slice(1, -1) : segment;
    const startsWithSpace = /^\s/.test(body);
    const tokens = body.split(/\s+/).filter(Boolean);

    tokens.forEach((token, i) => {
      words.push({
        text: token,
        em,
        glue: i === 0 && words.length > 0 && !prevEndsWithSpace && !startsWithSpace,
      });
    });

    if (tokens.length > 0) prevEndsWithSpace = /\s$/.test(body);
  }

  return words;
}

export function plainText(text: string): string {
  return text.replace(/\*/g, "");
}
