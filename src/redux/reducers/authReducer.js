import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", "true");
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("provider");
      localStorage.removeItem("location");
      localStorage.removeItem("recording");
    },
    setUserData: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setUserData } = authSlice.actions;
export default authSlice.reducer;
