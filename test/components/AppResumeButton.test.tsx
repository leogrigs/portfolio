import AppResumeButton from "@/components/AppResumeButton";
import { ENGLISH } from "@/consts/en.const";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { describe, expect, it } from "vitest";

const mockStore = configureStore([]);

describe("AppResumeButton", () => {
  it("renders the resume button with correct link", () => {
    const store = mockStore({
      contentV2: {
        data: {
          ...ENGLISH,
          navbar: { ...ENGLISH.navbar, resume: "Resume" },
          links: { ...ENGLISH.links, resume: "https://example.com/resume.pdf" },
        },
      },
    });

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
