
import { createAsyncThunk } from "@reduxjs/toolkit"
import { AuthAPI } from "../../services/api.js";

export const registerUser = createAsyncThunk('/auth/register',
  async (payload, thunkAPI) => {
    try {
      const response = await AuthAPI.register(payload)
      console.log("FULL REGISTER RESPONSE:", response.data)
            return response.data.data
    } catch (error) {
      console.error("REGISTER ERROR:", error.response?.data || error.message)
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Register failed"
      )
    }
  }
)

export const loginUser = createAsyncThunk("/auth/login",
  async (payload, thunkAPI) => {
    try {
      const res = await AuthAPI.login(payload)
      console.log("LOGIN RESPONSE:", res.data)

      const { accessToken, refreshToken, user } = res.data.data

      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
      localStorage.setItem("user", JSON.stringify(user))  

      return user
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errors || [err.response.data.message]
      )
    }
  }
)


export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
        await AuthAPI.logout();

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        return null;
    } catch (error) {
        return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to logout"
    );
    }
}
);
