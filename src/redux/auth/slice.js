import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("accessToken")
const user = (() => {
  const raw = localStorage.getItem("user");
  if (!raw || raw === "undefined") return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
})();


const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: !!token,
    user: user
  },
  reducers: {
    login: (state,action) => {
      state.isLoggedIn = true
      state.user = action.payload
      localStorage.setItem("user", JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.user = null
          localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user");
    }
  }
});

export const {login, logout} = slice.actions

export default slice.reducer;
