import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "./operations";

const token = localStorage.getItem("accessToken");

const user = (() => {
  const raw = localStorage.getItem("user");
  if (!raw || raw === "undefined") return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
})();

const initialState = {
  isLoggedIn: !!token,
  user,
  error: null,
  status: "idle", 
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Error";
      })

      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "reject";
        state.error = action.payload;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "success";
        state.user = null;
        state.isLoggedIn = false;
      });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;
