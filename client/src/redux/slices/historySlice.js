// src/slices/historySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetPostUserHistory, apiRemoveUserHistory } from "@/api/api";

// Thunks
export const fetchUserHistory = createAsyncThunk(
  "history/fetchUserHistory",
  async (userId, thunkAPI) => {
    const res = await apiGetPostUserHistory(userId);
    console.log("history", res);
    return res.history;
  }
);

export const removeUserHistory = createAsyncThunk(
  "history/removeUserHistory",
  async ({ userId, postId }, thunkAPI) => {
    const response = await apiRemoveUserHistory(userId, postId);
    if (response.status === "success") {
      return postId;
    }
    return thunkAPI.rejectWithValue("Error removing history");
  }
);

// Slice
const historySlice = createSlice({
  name: "history",
  initialState: {
    historyPosts: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserHistory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.historyPosts = action.payload;
      })
      .addCase(fetchUserHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeUserHistory.fulfilled, (state, action) => {
        state.historyPosts = state.historyPosts.filter(
          (item) => item.postId !== action.payload
        );
      });
  },
});

export default historySlice.reducer;
