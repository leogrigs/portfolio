import AppLanguageSelector from "@/components/AppLanguageSelector";
import contentReducer, { fetchData } from "@/store/slices/contentSlice";
import contentReducerV2 from "@/store/slices/contentSlice-v2";
import localeReducer, { setLocale } from "@/store/slices/localeSlice";
import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

vi.mock("@/store/slices/contentSlice", async (importOriginal) => {
  const actual =
    (await importOriginal()) as typeof import("@/store/slices/contentSlice");
  return {
    ...actual,
    fetchData: vi.fn(),
  };
});

describe("AppLanguageSelector", () => {
  it("renders the language selector and changes language on selection", async () => {
    const store = configureStore({
      reducer: {
        locale: localeReducer,
        content: contentReducer,
        contentV2: contentReducerV2,
      },
    });

    store.dispatch = vi.fn();

    render(
      <Provider store={store}>
        <AppLanguageSelector />
      </Provider>
    );

    expect(screen.getByText("English")).toBeInTheDocument();

    fireEvent.click(screen.getByText("English"));
    fireEvent.click(screen.getByText("Portuguese"));

    expect(store.dispatch).toHaveBeenCalledWith(setLocale("pt-BR"));
    expect(store.dispatch).toHaveBeenCalledWith(fetchData("pt-BR"));
  });
});
