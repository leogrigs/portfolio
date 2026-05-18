import Welcome from "@/sections/Welcome";
import { ENGLISH } from "@/consts/en.const";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("Welcome", () => {
  it("renders welcome section with correct data", () => {
    const store = mockStore({
      contentV2: {
        data: {
          ...ENGLISH,
          home: {
            ...ENGLISH.home,
            name: "John Doe",
            role: "Software Engineer",
            description: "I build amazing web applications.",
          },
        },
      },
    });

    render(
      <Provider store={store}>
        <Welcome />
      </Provider>
    );

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(
      screen.getByText("I build amazing web applications.")
    ).toBeInTheDocument();
  });

  it("does not render role or description when home fields are empty", () => {
    const store = mockStore({
      contentV2: {
        data: {
          ...ENGLISH,
          home: {
            ...ENGLISH.home,
            name: "",
            role: "",
            description: "",
            stats: [],
          },
        },
      },
    });

    render(
      <Provider store={store}>
        <Welcome />
      </Provider>
    );

    expect(screen.queryByText(/Software Engineer/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/I build amazing web applications./i)
    ).not.toBeInTheDocument();
  });
});
