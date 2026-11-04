import { act, fireEvent, screen, within } from "@testing-library/react";
import Contact from "../src/chapters/Contact";
import Impact from "../src/chapters/Impact";
import Path from "../src/chapters/Path";
import { CONTENT, LINKS } from "../src/content";
import { mockMatchMedia, REDUCED_MOTION, renderWithProviders } from "./utils";

const en = CONTENT.en;

describe("Impact", () => {
  it("renders every before/after step while pinned", () => {
    renderWithProviders(<Impact />);
    for (const step of en.impact.steps) {
      expect(screen.getByText(step.before)).toBeInTheDocument();
      expect(screen.getByText(step.after)).toBeInTheDocument();
      expect(screen.getByText(step.context)).toBeInTheDocument();
    }
  });

  it("falls back to a static, struck-through list with reduced motion", () => {
    const restore = mockMatchMedia(REDUCED_MOTION);
    const { container } = renderWithProviders(<Impact />);
    expect(container.querySelectorAll("s")).toHaveLength(en.impact.steps.length);
    expect(container.querySelector(".sticky")).toBeNull();
    restore();
  });
});

describe("Path", () => {
  it("renders the vertical timeline on small screens", () => {
    const { container } = renderWithProviders(<Path />);
    const timeline = container.querySelector("ol") as HTMLElement;
    expect(within(timeline).getAllByRole("listitem")).toHaveLength(en.path.milestones.length);
  });

  it("labels the current role as now instead of its start year", () => {
    renderWithProviders(<Path />);
    expect(screen.getByText(en.path.nowLabel)).toBeInTheDocument();
    expect(screen.getByText("since 2025 · San Francisco · remote")).toBeInTheDocument();
  });

  it("renders the pinned horizontal track on wide screens", () => {
    const restore = mockMatchMedia((q) => q.includes("min-width"));
    const { container } = renderWithProviders(<Path />);
    expect(container.querySelector(".sticky")).not.toBeNull();
    for (const m of en.path.milestones) {
      expect(screen.getAllByText(m.company).length).toBeGreaterThan(0);
    }
    restore();
  });

  it("lists the tools, once with reduced motion", () => {
    renderWithProviders(<Path />);
    expect(screen.getAllByText("Claude Code").length).toBeGreaterThan(0);

    const restore = mockMatchMedia(REDUCED_MOTION);
    const { container } = renderWithProviders(<Path />);
    expect(within(container).getAllByText("Claude Code")).toHaveLength(1);
    restore();
  });
});

describe("Contact", () => {
  it("links to email and profiles", () => {
    renderWithProviders(<Contact />);
    expect(screen.getByRole("link", { name: LINKS.email })).toHaveAttribute(
      "href",
      `mailto:${LINKS.email}`
    );
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute(
      "href",
      LINKS.linkedin
    );
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute("href", LINKS.github);
    expect(screen.getByRole("link", { name: /Resume/ })).toHaveAttribute("href", LINKS.resume);
  });

  it("copies the email address", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    renderWithProviders(<Contact />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: en.contact.copy }));
    });

    expect(writeText).toHaveBeenCalledWith(LINKS.email);
    expect(screen.getByRole("button", { name: en.contact.copied })).toBeInTheDocument();
  });

  it("shows the time in São Paulo", () => {
    renderWithProviders(<Contact />);
    expect(screen.getByText(en.contact.clockLabel, { exact: false })).toBeInTheDocument();
    expect(document.querySelector("time")?.textContent).toMatch(/\d{2}:\d{2}/);
  });
});
