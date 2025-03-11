import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // ✅ User ko persist karna
  token: localStorage.getItem("token") || null, // ✅ Token ko bhi persist karna
  isAuthenticated: !!localStorage.getItem("token"), // ✅ Authentication state
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload)); // ✅ Save user to localStorage
      localStorage.setItem("token", action.payload.token); // ✅ Save token
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user"); // ✅ Clear user from storage
      localStorage.removeItem("token"); // ✅ Clear token
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
