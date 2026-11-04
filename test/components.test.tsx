import { act, fireEvent, render, screen } from "@testing-library/react";
import { Intro } from "../src/components/Intro";
import { Nav } from "../src/components/Nav";
import ParticleField from "../src/components/ParticleField";
import { RiseText } from "../src/components/text/RiseText";
import { ThemeToggle } from "../src/components/ThemeToggle";
import { LINKS } from "../src/content";
import { renderWithProviders } from "./utils";

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

describe("ParticleField", () => {
  it("reports when canvas is unavailable", () => {
    const onSupportChange = vi.fn();
    render(
      <ParticleField
        scene="home"
        heroLines={["A"]}
        contactWord="hi"
        active
        reducedMotion={false}
        onSupportChange={onSupportChange}
      />
    );
    expect(onSupportChange).toHaveBeenCalledWith(false);
  });

  it("draws a static frame per scene with reduced motion", () => {
    const fillRect = vi.fn();
    const ctx = {
      setTransform: vi.fn(),
      clearRect: vi.fn(),
      fillRect,
      measureText: () => ({ width: 50, actualBoundingBoxAscent: 70, actualBoundingBoxDescent: 0 }),
      fillText: vi.fn(),
      getImageData: (_x: number, _y: number, w: number, h: number) => ({
        data: new Uint8ClampedArray(w * h * 4).fill(255),
      }),
      globalAlpha: 1,
      fillStyle: "",
      font: "",
    };
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = (() => ctx) as unknown as HTMLCanvasElement["getContext"];
    const onSupportChange = vi.fn();

    const { rerender, unmount } = render(
      <ParticleField
        scene="home"
        heroLines={["LEO"]}
        contactWord="hi"
        active
        reducedMotion
        onSupportChange={onSupportChange}
      />
    );
    expect(onSupportChange).toHaveBeenCalledWith(true);
    expect(fillRect).toHaveBeenCalled();

    for (const scene of ["impact", "path", "contact"] as const) {
      fillRect.mockClear();
      rerender(
        <ParticleField scene={scene} heroLines={["LEO"]} contactWord="hi" active reducedMotion />
      );
      expect(fillRect).toHaveBeenCalled();
    }

    unmount();
    HTMLCanvasElement.prototype.getContext = original;
  });
});

describe("Hero", () => {
  it("shows the full name as the page heading", async () => {
    const { default: Hero } = await import("../src/chapters/Hero");
    renderWithProviders(<Hero ready particlesOn />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Leonardo Grigorio Ferreira" })
    ).toBeInTheDocument();
    expect(screen.queryByText("LEONARDO")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Scroll down" })).toHaveAttribute(
      "href",
      "#impact"
    );
  });

  it("falls back to type when particles are unavailable", async () => {
    const { default: Hero } = await import("../src/chapters/Hero");
    renderWithProviders(<Hero ready particlesOn={false} />);
    expect(screen.getByText("LEONARDO")).toBeInTheDocument();
  });
});
