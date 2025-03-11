import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resumeData: JSON.parse(localStorage.getItem("resumeData")) || null, // ✅ Persisted resume data
  isLoading: false,
  error: null,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setResume: (state, action) => {
      state.resumeData = action.payload;
      localStorage.setItem("resumeData", JSON.stringify(action.payload)); // ✅ Save to localStorage
    },
    clearResume: (state) => {
      state.resumeData = null;
      localStorage.removeItem("resumeData"); // ✅ Remove from localStorage
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setResume, clearResume, setLoading, setError, clearError } =
  resumeSlice.actions;
export default resumeSlice.reducer;
