import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "./operations";

const initialState = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  :null

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

const slice = createSlice({
  name: "auth",
    initialState: {
    isLoggedIn: !!token,
      user: user,
      error:null
    },
reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading"
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "success"
        state.user = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload || "Error"
      })

      .addCase(loginUser.pending, (state) => {
        state.status = "loading"
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success"
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "reject"
        state.error = action.payload
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "success"
        state.user = null
      })
  }
});

export const { login, logout } = slice.actions;

export default slice.reducer;



// const slice = createSlice({
//   name: "auth",
//   initialState: {
//     isLoggedIn: !!token,
//     user: user
//   },
//   reducers: {
//     login: (state,action) => {
//       state.isLoggedIn = true
//       state.user = action.payload
//       localStorage.setItem("user", JSON.stringify(action.payload))
//     },
//     logout: (state) => {
//       state.isLoggedIn = false
//       state.user = null
//           localStorage.removeItem("accessToken")
//     localStorage.removeItem("refreshToken")
//     localStorage.removeItem("user");
//     }
//   }
// });