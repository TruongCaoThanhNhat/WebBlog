import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../slices/categorySlice";
import authenticationReducer from "../../redux/slice/authenticationSlice";
import historyReducer from "../slices/historySlice";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    user: authenticationReducer,
    history: historyReducer,
    // post: postSlice,
  },
});

export default store;
