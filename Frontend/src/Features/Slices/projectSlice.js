import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  isLoading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
  },
});

export const { setProjects } = projectSlice.actions;
export default projectSlice.reducer;
