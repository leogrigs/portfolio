import { act, render, screen } from "@testing-library/react";
import { useChapter } from "../src/hooks/useChapter";

const IDS = ["a", "b", "c"] as const;
const tops: Record<string, number> = { a: 0, b: 900, c: 1800 };

function Probe() {
  const active = useChapter(IDS);
  return (
    <>
      {IDS.map((id) => (
        <section key={id} id={id} />
      ))}
      <output>{active}</output>
    </>
  );
}

describe("useChapter", () => {
  let scroll = 0;
  const originalRect = Element.prototype.getBoundingClientRect;

  beforeEach(() => {
    scroll = 0;
    Object.defineProperty(window, "innerHeight", { value: 800, configurable: true });
    Element.prototype.getBoundingClientRect = function () {
      const top = (tops[this.id] ?? 0) - scroll;
      return { top, bottom: top + 900, left: 0, right: 0, width: 0, height: 900, x: 0, y: top, toJSON: () => ({}) };
    };
  });

  afterEach(() => {
    Element.prototype.getBoundingClientRect = originalRect;
  });

  async function scrollTo(y: number) {
    scroll = y;
    await act(async () => {
      window.dispatchEvent(new Event("scroll"));
      await new Promise((r) => requestAnimationFrame(() => r(null)));
    });
  }

  it("tracks the section crossing the middle of the viewport", async () => {
    render(<Probe />);
    expect(screen.getByRole("status")).toHaveTextContent("a");

    await scrollTo(600);
    expect(screen.getByRole("status")).toHaveTextContent("b");

    await scrollTo(1500);
    expect(screen.getByRole("status")).toHaveTextContent("c");

    await scrollTo(0);
    expect(screen.getByRole("status")).toHaveTextContent("a");
  });
});
