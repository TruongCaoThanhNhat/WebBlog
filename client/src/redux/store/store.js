import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../slices/categorySlice";
import authenticationReducer from "../../redux/slice/authenticationSlice";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    user: authenticationReducer,
    // post: postSlice,
  },
});

export default store;
