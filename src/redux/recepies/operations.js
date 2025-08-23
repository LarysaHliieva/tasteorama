import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosAPI from "../../services/api.js";

export const getRecipeById = createAsyncThunk(
  "recipes/getRecipeById",
  async (recipeId, thunkAPI) => {
    try {
      const response = await axiosAPI.get(`/recipes/${recipeId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
