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

export const addToFavorites = createAsyncThunk(
  "recipes/addToFavorites",
  async (recipeId, thunkAPI) => {
    try {
      const response = await axiosAPI.post(`/recipes/favorites/${recipeId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  "recipes/removeFromFavorites",
  async (recipeId, thunkAPI) => {
    try {
      const response = await axiosAPI.delete(`/recipes/favorites/${recipeId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getRecipes = createAsyncThunk(
  "recipes/getRecipes",

  async ({ page = 1, limit = 12, filters }, thunkAPI) => {
    try {
      console.log(filters)
      const params = new URLSearchParams({
        page,
        limit,
      });
      if (filters.categories.length) {
        params.append("category", filters.categories.map((c)=> c.value).join(","));
      }
      if (filters.ingredients.length) {
        params.append("ingredients", filters.ingredients.map((i)=> i.value).join(","));
      }
      if (filters.searchQuery) {
        params.append("query", filters.searchQuery);
      }
      console.log("Request URL:", `/recipes?${params.toString()}`);
      const response = await axiosAPI.get(`/recipes?${params}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);