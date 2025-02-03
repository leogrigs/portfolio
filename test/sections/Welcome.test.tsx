/* eslint-disable @typescript-eslint/no-explicit-any */
import Welcome from "@/sections/Welcome";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { RootState } from "../../src/store/store";

const mockStore = configureStore<RootState>();

describe("Welcome", () => {
  it("renders welcome section with correct data", () => {
    const store = mockStore({
      content: {
        data: {
          welcome: {
            introduction: "Hello, my name is",
            firstName: "John",
            lastName: "Doe",
            role: "Software Engineer",
            paragraph: "I build amazing web applications.",
          },
        },
      },
    } as any);

    render(
      <Provider store={store}>
        <Welcome />
      </Provider>
    );

    expect(screen.getByText("Hello, my name is")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(
      screen.getByText("I build amazing web applications.")
    ).toBeInTheDocument();
  });

  it("does not render any text if welcome data is missing", () => {
    const store = mockStore({
      content: {
        data: { welcome: undefined },
      },
    } as any);

    render(
      <Provider store={store}>
        <Welcome />
      </Provider>
    );

    expect(screen.queryByText(/Hello, my name is/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/John/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Doe/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Software Engineer/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/I build amazing web applications./i)
    ).not.toBeInTheDocument();
  });
});
