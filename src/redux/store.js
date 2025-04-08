import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";

import themeReducer from "./features/themeSlice";
import filterReducer from "./features/filterSlice";
import toastReducer from "./features/toastSlice";
import { habitApi } from "./api/habitApi";
import { journalApi } from "./api/journalApi";
import { toastApi } from "./api/toastApi";
import journalReducer from "./features/journalAdapter";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

/* REDUX PERSISTENCE */
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["theme", "filter"],
};

const rootReducer = combineReducers({
  theme: themeReducer,
  filter: filterReducer,
  journal: journalReducer,
  toast: toastReducer,
  [journalApi.reducerPath]: journalApi.reducer,
  [habitApi.reducerPath]: habitApi.reducer,
  [toastApi.reducerPath]: toastApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(habitApi.middleware, journalApi.middleware, toastApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
