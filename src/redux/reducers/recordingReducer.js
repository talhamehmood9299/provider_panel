import { createSlice } from "@reduxjs/toolkit";

const recordingSlice = createSlice({
  name: "recording",
  initialState: {
    transcription: {},
    formState: {
      name_of_patient: "",
      provider_id: "",
      audio_file: null,
      comments: "",
      text: "",
    },
  },
  reducers: {
    setTranscription: (state, action) => {
      state.transcription = action.payload;
    },
    setFormState: (state, action) => {
      state.formState = { ...state.formState, ...action.payload };
    },
    resetFormState: (state) => {
      state.formState = {
        name_of_patient: "",
        provider_id: "",
        audio_file: null,
        comments: "",
        text: "",
      };
      state.transcription = {};
    },
  },
});

export const { setTranscription, resetFormState, setFormState } =
  recordingSlice.actions;
export default recordingSlice.reducer;
