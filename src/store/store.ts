import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./slices/contentSlice";
import localeReducer from "./slices/localeSlice";

const store = configureStore({
  reducer: {
    content: contentReducer,
    locale: localeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
