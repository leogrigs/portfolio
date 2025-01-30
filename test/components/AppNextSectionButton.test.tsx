import AppNextSectionButton from "@/components/AppNextSectionButton";
import { render, screen } from "@testing-library/react";

describe("AppNextSectionButton", () => {
  it('renders the ChevronUp icon when sectionId is "welcome"', () => {
    render(<AppNextSectionButton sectionId="welcome" />);
    const chevronUp = screen.getByRole("link").querySelector("svg");
    expect(chevronUp).toBeInTheDocument();
  });

  it('renders the ChevronDown icon when sectionId is not "welcome"', () => {
    render(<AppNextSectionButton sectionId="other" />);
    const chevronDown = screen.getByRole("link").querySelector("svg");
    expect(chevronDown).toBeInTheDocument();
  });

  it("renders with the correct href attribute based on sectionId", () => {
    render(<AppNextSectionButton sectionId="section1" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "#section1");
  });

  it('uses the default "welcome" sectionId when no sectionId is provided', () => {
    render(<AppNextSectionButton />);
    const chevronUp = screen.getByRole("link").querySelector("svg");
    expect(chevronUp).toBeInTheDocument();
  });
});
