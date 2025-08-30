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
      console.log(filters);
      const params = new URLSearchParams({
        page,
        limit,
      });
      if (filters.categories.length) {
        params.append(
          "category",
          filters.categories.map((c) => c.label).join(",")
        );
      }
      if (filters.ingredients.length) {
        params.append(
          "ingredient",
          filters.ingredients.map((i) => i.label).join(",")
        );
      }
      if (filters.searchQuery) {
        params.append("title", filters.searchQuery);
      }
      const response = await axiosAPI.get(`/recipes?${params}`);
      const data = response.data?.data;
      console.log(filters);
      return {
        recipes: data?.recipes || [],
        pagination: {
          page: data?.page || 1,
          totalPages: data?.totalPages || 1,
          totalItems: data?.total || 0,
        },
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getFavorites = createAsyncThunk(
  "recipes/getFavorites",

  async (_, thunkAPI) => {
    const storedData = JSON.parse(localStorage.getItem("user"));
    const token =
      storedData?.accessToken || "VaIZ6/w2OQTMnCs9e6AK8KcA+CWliL7oqgcur+1s";
    console.log("Token before request:", token);
    try {
      const response = await axiosAPI.get("/favorites", {
        headers: {
          Authorization: `Bearer ${token}`, // передаємо токен явно
        },
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
