import { render, screen } from "@testing-library/react";
import AppSectionWrapper from "../../src/components/AppSectionWrapper";

vi.mock("../../src/components/AppNextSectionButton", () => ({
  default: vi.fn(() => <button>Next Section</button>),
}));

describe("AppSectionWrapper", () => {
  it("renders the section with title and number", () => {
    render(
      <AppSectionWrapper
        sectionId="test-section"
        sectionNumber="1"
        sectionTitle="Test Title"
      >
        <p>Test Content</p>
      </AppSectionWrapper>
    );

    expect(screen.getByText("1.")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders without section number", () => {
    render(
      <AppSectionWrapper
        sectionId="test-section"
        sectionTitle="Title Without Number"
      >
        <p>Some Content</p>
      </AppSectionWrapper>
    );

    expect(screen.getByText("Title Without Number")).toBeInTheDocument();
    expect(screen.getByText("Some Content")).toBeInTheDocument();
  });

  it("renders the next section button when nextSectionId is provided", () => {
    render(
      <AppSectionWrapper sectionId="test-section" nextSectionId="next-section">
        <p>Content</p>
      </AppSectionWrapper>
    );

    expect(screen.getByText("Next Section")).toBeInTheDocument();
  });
});
