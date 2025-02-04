/* eslint-disable @typescript-eslint/no-explicit-any */
import Experience from "@/sections/Experience";
import { RootState } from "@/store/store";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore<RootState>();

describe("Experience", () => {
  it("renders Experience section with correct data", () => {
    const store = mockStore({
      content: {
        data: {
          experience: [
            {
              company: "NTT Data",
              role: "Software Engineer",
              period: "Jan 2022 - Present",
              description: "Worked on multiple projects in fintech.",
              projects: [
                {
                  cardTitle: "Project A",
                  cardDescription: "Description A",
                  highlights: [],
                  technologies: ["React", "TypeScript"],
                },
                {
                  cardTitle: "Project B",
                  cardDescription: "Description B",
                  highlights: [],
                  technologies: ["React", "TypeScript"],
                },
              ],
            },
          ],
          others: {
            sections: { experience: "Work Experience" },
          },
        },
      },
    } as any);

    render(
      <Provider store={store}>
        <Experience />
      </Provider>
    );

    expect(screen.getByText("Work Experience")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Jan 2022 - Present")).toBeInTheDocument();
    expect(
      screen.getByText("Worked on multiple projects in fintech.")
    ).toBeInTheDocument();
    expect(screen.getByText("Project A")).toBeInTheDocument();
    expect(screen.getByText("Project B")).toBeInTheDocument();
  });

  it("renders default section title if not provided", () => {
    const store = mockStore({
      content: {
        data: {
          experience: [
            {
              company: "NTT Data",
              role: "Software Engineer",
              period: "Jan 2022 - Present",
              description: "Worked on multiple projects.",
              projects: [],
            },
          ],
          others: { sections: {} },
        },
      },
    } as any);

    render(
      <Provider store={store}>
        <Experience />
      </Provider>
    );

    expect(screen.getByText("Experience")).toBeInTheDocument();
  });

  it("does not render projects if no data is available", () => {
    const store = mockStore({
      content: {
        data: {
          experience: [
            {
              company: "NTT Data",
              role: "Software Engineer",
              period: "Jan 2022 - Present",
              description: "Worked on multiple projects.",
              projects: [],
            },
          ],
          others: { sections: { experience: "Work Experience" } },
        },
      },
    } as any);

    render(
      <Provider store={store}>
        <Experience />
      </Provider>
    );

    expect(screen.queryByText("Project A")).not.toBeInTheDocument();
    expect(screen.queryByText("Project B")).not.toBeInTheDocument();
  });
});
