import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedLocation: "",
  selectedLocationId: "",
  selectedAddress: "",
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload.location;
      state.selectedLocationId = action.payload.locationId;
      state.selectedAddress = action.payload.address;
    },
  },
});

export const { setSelectedLocation } = locationSlice.actions;
export default locationSlice.reducer;
