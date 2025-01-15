import { fetchContentfulData } from "@/contentful/contentful";
import { ContentResponse } from "@/interfaces/content-response.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ContentState {
  data: ContentResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchData = createAsyncThunk(
  "content/fetchData",
  async (locale: string): Promise<ContentResponse> => {
    const response = await fetchContentfulData("portfolio", {}, locale);
    return response;
  }
);

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default contentSlice.reducer;
