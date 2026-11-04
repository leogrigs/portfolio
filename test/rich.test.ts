import { parseRich, plainText } from "../src/lib/rich";

describe("parseRich", () => {
  it("splits plain text into words", () => {
    expect(parseRich("one two  three").map((w) => w.text)).toEqual([
      "one",
      "two",
      "three",
    ]);
  });

  it("marks emphasised words", () => {
    const words = parseRich("I build *in production* daily");
    expect(words.filter((w) => w.em).map((w) => w.text)).toEqual([
      "in",
      "production",
    ]);
    expect(words.at(-1)).toMatchObject({ text: "daily", em: false, glue: false });
  });

  it("glues punctuation that follows an emphasis", () => {
    const words = parseRich("rodar *em produção*, não em demo.");
    const comma = words.find((w) => w.text === ",");
    expect(comma).toMatchObject({ em: false, glue: true });
  });

  it("does not glue the first word", () => {
    const [first] = parseRich("*Leading* emphasis");
    expect(first).toMatchObject({ text: "Leading", em: true, glue: false });
  });

  it("strips markers for plain text", () => {
    expect(plainText("a *b* c")).toBe("a b c");
  });
});
