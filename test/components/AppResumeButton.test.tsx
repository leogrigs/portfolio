/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AppResumeButton from "../../src/components/AppResumeButton";
import { RootState } from "../../src/store/store";

const mockStore = configureStore<RootState>();

describe("AppResumeButton", () => {
  it("renders the resume button with correct link", () => {
    const store = mockStore({
      content: {
        data: { resumeLink: "https://example.com/resume.pdf" },
      },
    } as any);

    render(
      <Provider store={store}>
        <AppResumeButton />
      </Provider>
    );

    const link = screen.getByRole("link", { name: /resume/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com/resume.pdf");
    expect(link).toHaveAttribute("target", "_blank");
  });
});
