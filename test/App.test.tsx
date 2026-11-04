import { act, fireEvent, render, screen } from "@testing-library/react";
import App, { INTRO_STORAGE_KEY } from "../src/App";
import { LOCALE_STORAGE_KEY } from "../src/i18n/detect";

vi.mock("@vercel/analytics/react", () => ({
  Analytics: () => null,
}));

describe("App", () => {
  beforeEach(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, "en");
  });

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("plays the intro on a fresh visit", () => {
    render(<App />);
    expect(screen.getByTestId("intro")).toBeInTheDocument();
  });

  it("skips the intro once it has been seen in this session", () => {
    sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    render(<App />);
    expect(screen.queryByTestId("intro")).not.toBeInTheDocument();
  });

  it("marks the intro as seen when skipped with a key", () => {
    render(<App />);
    act(() => {
      fireEvent.keyDown(window, { key: "Enter" });
    });
    expect(sessionStorage.getItem(INTRO_STORAGE_KEY)).toBe("1");
  });

  it("renders every chapter", () => {
    sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    render(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Leonardo Grigorio Ferreira" })
    ).toBeInTheDocument();
    for (const title of ["Impact", "Path", "Contact"]) {
      expect(screen.getByRole("heading", { level: 2, name: title })).toBeInTheDocument();
    }
    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute(
      "href",
      "#impact"
    );
  });

  it("shows the particle word as type when the canvas is unavailable", () => {
    sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    render(<App />);
    expect(screen.getByText("LEONARDO")).toBeInTheDocument();
  });

  it("switches the whole page to Portuguese", () => {
    sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Mudar para português" }));

    expect(screen.getByRole("heading", { level: 2, name: "Impacto" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Trajetória" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Switch to English" })).toBeInTheDocument();
  });
});
