import { AppNavigationMenu } from "@/components/AppNavigationMenu";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { describe, expect, it } from "vitest";

const mockStore = configureStore([]);

describe("AppNavigationMenu", () => {
  it("renders navigation links from Redux state", () => {
    const store = mockStore({
      content: {
        data: {
          others: {
            links: [
              { href: "#home", text: "Home" },
              { href: "#about", text: "About" },
            ],
          },
        },
      },
      locale: { currentLocale: "en-US" },
    });

    render(
      <Provider store={store}>
        <AppNavigationMenu />
      </Provider>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("renders utility buttons", () => {
    const store = mockStore({
      content: {
        data: {
          others: {
            links: [],
          },
        },
      },
      locale: { currentLocale: "en-US" },
    });

    render(
      <Provider store={store}>
        <AppNavigationMenu />
      </Provider>
    );

    expect(screen.getByText("Resume")).toBeInTheDocument();
  });
});
