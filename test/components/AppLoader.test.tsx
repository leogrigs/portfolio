import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { describe, expect, it } from "vitest";
import AppLoader from "../../src/components/AppLoader";

const mockStore = configureMockStore([]);

describe("AppLoader", () => {
  it("renders the loader with message from Redux store", () => {
    const store = mockStore({
      content: {
        data: {
          others: {
            loaderMessage: "Loading your experience...",
          },
        },
      },
    });

    render(
      <Provider store={store}>
        <AppLoader />
      </Provider>
    );

    expect(screen.getByAltText("Loading")).toBeInTheDocument();
    expect(screen.getByText("Loading your experience...")).toBeInTheDocument();
  });
});
