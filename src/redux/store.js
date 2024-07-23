import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import providersReducer from "./reducers/providersReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    provider: providersReducer,
  },
});

export default store;
