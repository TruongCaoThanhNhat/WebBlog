import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    cateData: [],
  },
  reducers: {
    getAll: (state, action) => {
      state.cateData = action.payload;
    },
  },
});

export const { getAll } = categorySlice.actions;
export default categorySlice.reducer;
