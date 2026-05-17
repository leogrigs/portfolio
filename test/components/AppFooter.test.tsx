import AppFooter from "@/components/AppFooter";
import { ENGLISH } from "@/consts/en.const";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { describe, expect, it } from "vitest";

const mockStore = configureStore([]);

describe("AppFooter", () => {
  it("renders footer text and back to top link", () => {
    const store = mockStore({
      contentV2: { data: ENGLISH },
    });

    render(
      <Provider store={store}>
        <AppFooter />
      </Provider>
    );

    expect(screen.getByText(ENGLISH.footer.made_by)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to top/i })).toHaveAttribute(
      "href",
      "#home"
    );
  });
});
