import { ENGLISH } from "@/consts/en.const";
import { fetchContentfulDataV2 } from "@/contentful/contentful";
import { ContentStateV2 } from "@/interfaces/content-state.interface";
import { PortfolioContent } from "@/interfaces/portfolio-content.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchDataV2 = createAsyncThunk(
  "content/fetchDataV2",
  async (locale: string): Promise<PortfolioContent> => {
    const response = await fetchContentfulDataV2("portfolioV2", {}, locale);
    return response;
  }
);

const initialState: ContentStateV2 = {
  data: ENGLISH,
  loading: false,
  error: null,
};

const contentSliceV2 = createSlice({
  name: "contentV2",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataV2.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataV2.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDataV2.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default contentSliceV2.reducer;
