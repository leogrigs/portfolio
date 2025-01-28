import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";
import App from "../src/App";
import store from "../src/store/store";

vi.mock("@vercel/analytics/react", () => ({
  Analytics: () => <div data-testid="analytics">Analytics</div>,
}));

vi.mock("../src/components/AppLoader", () => ({
  default: () => <div data-testid="app-loader">AppLoader</div>,
}));

vi.mock("../src/components/AppNavigationMenu", () => ({
  AppNavigationMenu: () => (
    <div data-testid="app-navigation-menu">NavigationMenu</div>
  ),
}));

vi.mock("./sections/Welcome", () => ({
  default: () => <div data-testid="welcome-section">Welcome</div>,
}));

vi.mock("./sections/About", () => ({
  default: () => <div data-testid="about-section">About</div>,
}));

vi.mock("./sections/Experience", () => ({
  default: () => <div data-testid="experience-section">Experience</div>,
}));

vi.mock("./sections/Projects", () => ({
  default: () => <div data-testid="projects-section">Projects</div>,
}));

vi.mock("./sections/Contact", () => ({
  default: () => <div data-testid="contact-section">Contact</div>,
}));

// Test suite
describe("App Component", () => {
  it("renders AppLoader initially", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByTestId("app-loader")).toBeInTheDocument();
  });

  it("renders main content after loading", async () => {
    vi.spyOn(store, "dispatch").mockReturnValue(
      await Promise.resolve({ type: "DUMMY_ACTION" })
    );

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    setTimeout(() => {
      expect(screen.queryByTestId("app-loader")).not.toBeInTheDocument();
      expect(screen.getByTestId("app-navigation-menu")).toBeInTheDocument();
      expect(screen.getByTestId("welcome-section")).toBeInTheDocument();
      expect(screen.getByTestId("about-section")).toBeInTheDocument();
      expect(screen.getByTestId("experience-section")).toBeInTheDocument();
      expect(screen.getByTestId("projects-section")).toBeInTheDocument();
      expect(screen.getByTestId("contact-section")).toBeInTheDocument();
      expect(screen.getByTestId("analytics")).toBeInTheDocument();
    }, 3000);
  });
});
