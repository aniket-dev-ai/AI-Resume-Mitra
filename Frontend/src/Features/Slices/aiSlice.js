import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enhancement: JSON.parse(sessionStorage.getItem("enhancement")) || null, // ✅ Persist AI enhancement
  questions: JSON.parse(sessionStorage.getItem("questions")) || {}, // ✅ Questions persist
  hrAnswers: JSON.parse(sessionStorage.getItem("hrAnswers")) || [],
  isLoading: false,
  error: null,
};

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    setEnhancement: (state, action) => {
      state.enhancement = action.payload;
      sessionStorage.setItem("enhancement", JSON.stringify(action.payload)); // ✅ Save to sessionStorage
    },
    setQuestions: (state, action) => {
      const { skill, questions } = action.payload;
      state.questions[skill] = questions;
      sessionStorage.setItem("questions", JSON.stringify(state.questions)); // ✅ Persist questions
    },
    setHrAnswers: (state, action) => {
      state.hrAnswers = action.payload;
      sessionStorage.setItem("hrAnswers", JSON.stringify(action.payload)); // ✅ Persist HR Answers
    },
    clearAiData: (state) => {
      state.enhancement = null;
      state.questions = {};
      state.hrAnswers = [];
      sessionStorage.removeItem("enhancement");
      sessionStorage.removeItem("questions");
      sessionStorage.removeItem("hrAnswers");
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

export const {
  setEnhancement,
  setQuestions,
  setHrAnswers,
  clearAiData,
  setLoading,
  setError,
  clearError,
} = aiSlice.actions;
export default aiSlice.reducer;
