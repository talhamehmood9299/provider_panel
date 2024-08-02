import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./reducers/authReducer";
import providersReducer from "./reducers/providersReducer";
import locationReducer from "./reducers/locationReducer";
import recordingReducer from "./reducers/recordingReducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  provider: providersReducer,
  location: locationReducer,
  recording: recordingReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PERSIST",
          "persist/PURGE",
          "persist/REGISTER",
          "recording/setFormState",
        ],
        ignoredPaths: ["recording.formState.audio_file"],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
