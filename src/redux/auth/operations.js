import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../services/api";

export const logout = createAsyncThunk(
  "auth/logout",
  async (recipeId, thunkAPI) => {
    try {
      const response = await axiosAPI.post(`/logout/${recipeId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);