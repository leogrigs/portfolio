import { AppNavigationMenu } from "@/components/AppNavigationMenu";
import { ENGLISH } from "@/consts/en.const";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { describe, expect, it } from "vitest";

const mockStore = configureStore([]);

const baseState = {
  contentV2: { data: ENGLISH },
  locale: { currentLocale: "en-US" },
};

describe("AppNavigationMenu", () => {
  it("renders desktop navigation links from contentV2", () => {
    const store = mockStore(baseState);

    render(
      <Provider store={store}>
        <AppNavigationMenu />
      </Provider>
    );

    expect(screen.getAllByText("Home").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("About").length).toBeGreaterThanOrEqual(1);
  });

  it("renders utility buttons", () => {
    const store = mockStore(baseState);

    render(
      <Provider store={store}>
        <AppNavigationMenu />
      </Provider>
    );

    expect(screen.getByText("Resume")).toBeInTheDocument();
  });

  it("opens mobile sheet with section links", () => {
    const store = mockStore(baseState);

    render(
      <Provider store={store}>
        <AppNavigationMenu />
      </Provider>
    );

    fireEvent.click(
      screen.getByRole("button", { name: /open navigation menu/i })
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Navigation" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Experience" }).length).toBeGreaterThanOrEqual(1);
  });
});
