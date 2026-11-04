import { act, fireEvent, render, screen } from "@testing-library/react";
import { Intro } from "../src/components/Intro";
import { Nav } from "../src/components/Nav";
import Backdrop from "../src/components/Backdrop";
import { CursorGlow } from "../src/components/CursorGlow";
import { NAME_HOLD_MS } from "../src/components/display/HeroName";
import { RiseText } from "../src/components/text/RiseText";
import { ThemeToggle } from "../src/components/ThemeToggle";
import { LINKS } from "../src/content";
import { setHeroWord, useHeroWord } from "../src/lib/heroWord";
import { mockMatchMedia, REDUCED_MOTION, renderWithProviders } from "./utils";

describe("RiseText", () => {
  it("keeps the sentence readable", () => {
    const { container } = render(<RiseText as="h2" text="Got a *minute*?" />);
    expect(container.querySelector("h2")?.textContent).toBe("Got a minute?");
  });
});

describe("Intro", () => {
  it("calls onDone when clicked or on a key press", () => {
    const onDone = vi.fn();
    renderWithProviders(<Intro onDone={onDone} />);
    fireEvent.click(screen.getByTestId("intro"));
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onDone).toHaveBeenCalledTimes(2);
  });

  it("counts up to 100 and finishes", async () => {
    vi.useFakeTimers({ toFake: ["requestAnimationFrame", "setTimeout", "performance"] });
    const onDone = vi.fn();
    renderWithProviders(<Intro onDone={onDone} />);
    await act(async () => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(onDone).toHaveBeenCalled();
    vi.useRealTimers();
  });
});

describe("Nav", () => {
  it("shows the active chapter and links to every chapter", () => {
    renderWithProviders(<Nav active="path" />);
    expect(screen.getByText("02/03")).toBeInTheDocument();
    const chapterNav = screen.getByRole("navigation", { name: "Chapters" });
    expect(chapterNav.querySelectorAll("a")).toHaveLength(4);
    expect(chapterNav.querySelector('[aria-current="true"]')).toHaveAttribute(
      "href",
      "#path"
    );
    expect(screen.getByRole("link", { name: /Resume/ })).toHaveAttribute("href", LINKS.resume);
  });
});

describe("ThemeToggle", () => {
  afterEach(() => localStorage.clear());

  it("switches between dark and light", () => {
    renderWithProviders(<ThemeToggle />);
    expect(document.documentElement).toHaveClass("dark");

    fireEvent.click(screen.getByRole("button", { name: "Switch to light theme" }));
    expect(document.documentElement).toHaveClass("light");

    fireEvent.click(screen.getByRole("button", { name: "Switch to dark theme" }));
    expect(document.documentElement).toHaveClass("dark");
  });
});

function fakeContext() {
  const stroke = vi.fn();
  const ctx = {
    setTransform: vi.fn(),
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    stroke,
    globalAlpha: 1,
    lineWidth: 1,
    lineCap: "butt",
    strokeStyle: "",
    fillStyle: "",
  };
  return { ctx, stroke };
}

function HeroWordProbe() {
  return <span data-testid="hero-word">{useHeroWord()}</span>;
}

describe("Backdrop", () => {
  it("renders without canvas support", () => {
    const { container } = render(<Backdrop scene="impact" active reducedMotion={false} />);
    expect(container.querySelector("canvas")).toBeInTheDocument();
  });

  it("draws the clock and the wave only on their chapters", () => {
    const { ctx, stroke } = fakeContext();
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = (() => ctx) as unknown as HTMLCanvasElement["getContext"];

    const { rerender, unmount } = render(<Backdrop scene="home" active reducedMotion />);
    expect(stroke).not.toHaveBeenCalled();

    for (const scene of ["impact", "path"] as const) {
      stroke.mockClear();
      rerender(<Backdrop scene={scene} active reducedMotion />);
      expect(stroke).toHaveBeenCalled();
    }

    stroke.mockClear();
    rerender(<Backdrop scene="contact" active reducedMotion />);
    expect(stroke).not.toHaveBeenCalled();

    unmount();
    HTMLCanvasElement.prototype.getContext = original;
  });
});

describe("CursorGlow", () => {
  it("only renders for a real hover pointer", () => {
    const { container, unmount } = render(<CursorGlow />);
    expect(container.querySelector(".cursor-glow")).toBeNull();
    unmount();

    const restore = mockMatchMedia((q) => q.includes("hover: hover"));
    const { container: withMouse } = render(<CursorGlow />);
    expect(withMouse.querySelector(".cursor-glow")).toHaveAttribute("aria-hidden", "true");
    restore();
  });
});

describe("Hero", () => {
  afterEach(() => act(() => setHeroWord(0)));

  it("shows the full name as the heading and in display type", async () => {
    const { default: Hero } = await import("../src/chapters/Hero");
    renderWithProviders(<Hero ready />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Leonardo Grigorio Ferreira" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("hero-name").textContent).toContain("LEONARDO");
    expect(screen.getByRole("link", { name: "Scroll down" })).toHaveAttribute(
      "href",
      "#impact"
    );
  });

  it("highlights the word of the name on display", async () => {
    const { default: Hero } = await import("../src/chapters/Hero");
    renderWithProviders(<Hero ready />);
    act(() => setHeroWord(1));
    expect(screen.getByText("Grigorio")).toHaveClass("text-accent");
    expect(screen.getByText("Leonardo")).not.toHaveClass("text-accent");
  });

  it("cycles the display name through every word", async () => {
    vi.useFakeTimers({ toFake: ["setInterval", "clearInterval"] });
    const { default: Hero } = await import("../src/chapters/Hero");
    renderWithProviders(
      <>
        <Hero ready />
        <HeroWordProbe />
      </>
    );
    expect(screen.getByTestId("hero-word")).toHaveTextContent("0");

    act(() => {
      vi.advanceTimersByTime(NAME_HOLD_MS + 50);
    });
    expect(screen.getByTestId("hero-word")).toHaveTextContent("1");
    expect(screen.getByTestId("hero-name").textContent).toContain("GRIGORIO");

    act(() => {
      vi.advanceTimersByTime(NAME_HOLD_MS * 2);
    });
    expect(screen.getByTestId("hero-word")).toHaveTextContent("0");
    vi.useRealTimers();
  });

  it("keeps one static word with reduced motion", async () => {
    vi.useFakeTimers({ toFake: ["setInterval", "clearInterval"] });
    const restore = mockMatchMedia(REDUCED_MOTION);
    const { default: Hero } = await import("../src/chapters/Hero");
    renderWithProviders(<Hero ready />);
    act(() => {
      vi.advanceTimersByTime(NAME_HOLD_MS * 2);
    });
    const text = screen.getByTestId("hero-name").textContent ?? "";
    expect(text).toContain("LEONARDO");
    expect(text).not.toContain("GRIGORIO");
    restore();
    vi.useRealTimers();
  });
});
