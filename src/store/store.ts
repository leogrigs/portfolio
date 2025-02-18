import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./slices/contentSlice";
import contentReducerV2 from "./slices/contentSlice-v2";
import localeReducer from "./slices/localeSlice";

const store = configureStore({
  reducer: {
    content: contentReducer,
    contentV2: contentReducerV2,
    locale: localeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
