/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeToggle } from "../../src/components/ThemeToggle";
import { useTheme } from "../../src/providers/theme-provider";

vi.mock("../../src/providers/theme-provider", () => ({
  useTheme: vi.fn(),
}));

describe("ThemeToggle", () => {
  it("renders the correct icon based on the current theme", () => {
    (useTheme as any).mockReturnValue({ theme: "dark", setTheme: vi.fn() });
    render(<ThemeToggle />);
    expect(screen.getByRole("button").children[0]).toHaveClass("lucide-sun");
  });

  it("toggles the theme when clicked", () => {
    const setThemeMock = vi.fn();
    (useTheme as any).mockReturnValue({
      theme: "dark",
      setTheme: setThemeMock,
    });
    render(<ThemeToggle />);
    fireEvent.click(screen.getByTitle("Toggle theme"));
    expect(setThemeMock).toHaveBeenCalledWith("light");
  });
});
