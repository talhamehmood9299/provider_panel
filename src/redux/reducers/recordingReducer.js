import { createSlice } from "@reduxjs/toolkit";

const recordingSlice = createSlice({
  name: "recording",
  initialState: {
    transcription: {},
  },
  reducers: {
    setTranscription: (state, action) => {
      state.transcription = action.payload;
    },
    clearTranscription: (state) => {
      state.transcription = "";
    },
  },
});

export const { setTranscription, clearTranscription } = recordingSlice.actions;
export default recordingSlice.reducer;
