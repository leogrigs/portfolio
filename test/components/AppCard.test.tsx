import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import AppCard from "../../src/components/AppCard";
import { ICard } from "../../src/interfaces/card.interface";

const mockCard: ICard = {
  cardTitle: "Test Card",
  cardTitleLink: "https://example.com",
  cardSubtitle: "This is a test subtitle",
  highlights: ["Highlight 1", "Highlight 2"],
  technologies: ["React", "TypeScript"],
};

describe("AppCard Component", () => {
  it("renders the card with correct title, subtitle, and highlights", () => {
    render(<AppCard card={mockCard} />);

    expect(screen.getByText(mockCard.cardTitle)).toBeInTheDocument();
    expect(screen.getByText(mockCard.cardSubtitle)).toBeInTheDocument();
    mockCard.highlights.forEach((highlight) => {
      expect(screen.getByText(highlight)).toBeInTheDocument();
    });
  });

  it("renders the technologies as badges", () => {
    render(<AppCard card={mockCard} />);
    mockCard.technologies.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it("has a working link in the title", () => {
    render(<AppCard card={mockCard} />);
    const link = screen.getByRole("link", { name: mockCard.cardTitle });
    expect(link).toHaveAttribute("href", mockCard.cardTitleLink);
  });
});
