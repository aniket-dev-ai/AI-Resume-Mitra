import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // ✅ localStorage
import sessionStorage from "redux-persist/lib/storage/session"; // ✅ sessionStorage
import authReducer from "../Features/Slices/authSlice";
import resumeReducer from "../Features/Slices/resumeSlice";
import projectReducer from "../Features/Slices/projectSlice";
import aiReducer from "../Features/Slices/aiSlice";

import { aiApi } from "../Features/Api/AiApi";
import { authApi } from "../Features/Api/authApi";
import { resumesApi } from "../Features/Api/resumesApi";
import { projectApi } from "../Features/Api/ProjectApi";

// ✅ Browser Storage Check
const isStorageAvailable = (storageType) => {
  try {
    const testKey = "__storage_test__";
    storageType.setItem(testKey, "test");
    storageType.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

// ✅ Choose Storage Dynamically
const isBrowser = typeof window !== "undefined";
const useStorage = isBrowser && isStorageAvailable(localStorage) ? storage : undefined;
const useSessionStorage = isBrowser && isStorageAvailable(sessionStorage) ? sessionStorage : undefined;

// ✅ Auth Persist Config (Stored in localStorage)
const authPersistConfig = {
  key: "auth",
  storage: useStorage,
  whitelist: ["user", "token", "isAuthenticated"],
};

// ✅ AI Persist Config (Stored in sessionStorage)
const aiPersistConfig = {
  key: "ai",
  storage: useSessionStorage,
  whitelist: ["enhancement", "questions", "hrAnswers"],
};

// ✅ Apply Persist Reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedAiReducer = persistReducer(aiPersistConfig, aiReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // ✅ Auth state is persisted
    resume: resumeReducer, // ✅ Resume state is NOT persisted
    project: projectReducer, // ✅ Project state is NOT persisted
    ai: persistedAiReducer, // ✅ AI state persists in sessionStorage

    // ✅ API Reducers
    [aiApi.reducerPath]: aiApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [resumesApi.reducerPath]: resumesApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Required for Redux Persist
    }).concat(aiApi.middleware, authApi.middleware, resumesApi.middleware, projectApi.middleware),
});

// ✅ Persistor Export with Debug Mode
export const persistor = persistStore(store, null, () => {
  console.log("📦 Redux Persist rehydration completed!");
});

export default store;
