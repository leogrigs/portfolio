/* eslint-disable @typescript-eslint/no-explicit-any */
import Projects from "@/sections/Projects";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("Projects Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      content: {
        data: {
          projects: {
            paragraph: "Some projects I have worked on.",
            projects: [
              {
                cardTitle: "Project 1",
                cardDescription: "Description A",
                highlights: [],
                technologies: ["React", "TypeScript"],
              },
              {
                cardTitle: "Project 2",
                cardDescription: "Description B",
                highlights: [],
                technologies: ["React", "TypeScript"],
              },
            ],
          },
          others: {
            sections: {
              about: "Projects",
            },
          },
        },
      },
    });
  }) as any;

  it("renders the section title and paragraph", () => {
    render(
      <Provider store={store}>
        <Projects />
      </Provider>
    );

    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(
      screen.getByText("Some projects I have worked on.")
    ).toBeInTheDocument();
  });

  it("renders project cards", () => {
    render(
      <Provider store={store}>
        <Projects />
      </Provider>
    );

    expect(screen.getByText("Project 1")).toBeInTheDocument();
    expect(screen.getByText("Project 2")).toBeInTheDocument();
  });
});
