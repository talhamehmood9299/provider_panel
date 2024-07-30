import { createSlice } from "@reduxjs/toolkit";

const recordingSlice = createSlice({
  name: "recording",
  initialState: {
    audioBlob: null,
    transcription: "",
  },
  reducers: {
    setAudioBlob: (state, action) => {
      state.audioBlob = action.payload;
    },
    setTranscription: (state, action) => {
      state.transcription = action.payload;
    },
  },
});

export const { setAudioBlob, setTranscription } = recordingSlice.actions;
export default recordingSlice.reducer;
