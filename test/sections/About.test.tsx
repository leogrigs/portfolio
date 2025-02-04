/* eslint-disable @typescript-eslint/no-explicit-any */
import About from "@/sections/About";
import { RootState } from "@/store/store";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore<RootState>();

describe("About", () => {
  it("renders About section with correct data", () => {
    const store = mockStore({
      content: {
        data: {
          about: {
            bullets: ["I'm a software engineer.", "I love coding!"],
          },
          profilePicture: {
            fields: { file: { url: "profile.jpg" } },
          },
          others: {
            sections: { about: "About Me" },
          },
        },
      },
    } as any);

    render(
      <Provider store={store}>
        <About />
      </Provider>
    );

    expect(screen.getByText("About Me")).toBeInTheDocument();
    expect(screen.getByText("I'm a software engineer.")).toBeInTheDocument();
    expect(screen.getByText("I love coding!")).toBeInTheDocument();
    expect(screen.getByAltText("Leonardo Grigorio Ferreira")).toHaveAttribute(
      "src",
      "profile.jpg"
    );
    expect(screen.getByAltText("AWS Certification Badge")).toBeInTheDocument();
  });

  it("does not render bullets if data is missing", () => {
    const store = mockStore({
      content: {
        data: {
          about: { bullets: undefined },
          profilePicture: { fields: { file: { url: "profile.jpg" } } },
          others: { sections: { about: "About Me" } },
        },
      },
    } as any);

    render(
      <Provider store={store}>
        <About />
      </Provider>
    );

    expect(
      screen.queryByText("I'm a software engineer.")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("I love coding!")).not.toBeInTheDocument();
  });

  it("renders default section title if not provided", () => {
    const store = mockStore({
      content: {
        data: {
          about: { bullets: ["Test bullet"] },
          profilePicture: { fields: { file: { url: "profile.jpg" } } },
          others: { sections: {} },
        },
      },
    } as any);

    render(
      <Provider store={store}>
        <About />
      </Provider>
    );

    expect(screen.getByText("About")).toBeInTheDocument();
  });
});
