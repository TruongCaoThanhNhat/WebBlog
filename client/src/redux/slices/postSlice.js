import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    post: null,
    error: null,
    status: null,
    topMonth: null,
  },
  reducers: {
    postCreated: (state, action) => {
      state.post = action.payload;
      state.status = "succeeded";
    },
    postCreating: (state) => {
      state.status = "loading";
    },
    postCreateFailed: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    postTopMonth: (state, action) => {
      state.topMonth = action.payload;
    },
  },
});

export const { postCreated, postCreating, postCreateFailed, postTopMonth } =
  postSlice.actions;
export default postSlice.reducer;
