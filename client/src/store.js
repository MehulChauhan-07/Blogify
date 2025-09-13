import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/user/user.slice";
import sessionStorage from "redux-persist/es/storage/session";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

// Define our reducers
const appReducer = combineReducers({
  user: userReducer,
});

// Add a root reducer that can clear all state when logging out
const rootReducer = (state, action) => {
  if (action.type === "user/removeUser") {
    // Clear persisted state
    sessionStorage.removeItem("persist:root");

    // Return initial state
    return appReducer(undefined, action);
  }

  // Debug current state in development
  if (
    process.env.NODE_ENV === "development" &&
    action.type === "user/setUser"
  ) {
    console.log("Setting user state:", action.payload);
  }

  return appReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
