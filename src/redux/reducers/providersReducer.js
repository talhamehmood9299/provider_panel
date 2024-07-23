import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  providers: [],
  loading: false,
  error: null,
};

const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    setProvider: (state, action) => {
      state.providers = action.payload;
    },
  },
});

export const { setProvider } = providerSlice.actions;
export default providerSlice.reducer;
