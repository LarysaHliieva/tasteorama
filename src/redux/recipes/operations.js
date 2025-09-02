import { createAsyncThunk } from "@reduxjs/toolkit";

import toast from "react-hot-toast";

import axiosAPI from "../../services/api.js";

export const getRecipeById = createAsyncThunk(
  "recipes/getRecipeById",
  async (recipeId, thunkAPI) => {
    try {
      const response = await axiosAPI.get(`/recipes/${recipeId}`);
      return response.data.data;
    } catch (error) {
      console.log("error", error);
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Not found";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addToFavorites = createAsyncThunk(
  "recipes/addToFavorites",
  async (recipeId, thunkAPI) => {
    try {
      const response = await axiosAPI.post(`/favorites/${recipeId}`);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.messages || "Something went wrong!");
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  "recipes/removeFromFavorites",
  async (recipeId, thunkAPI) => {
    try {
      const response = await axiosAPI.delete(`/favorites/${recipeId}`);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.messages || "Something went wrong!");
      return thunkAPI.rejectWithValue(error.response?.data?.messages);
    }
  }
);

export const getRecipes = createAsyncThunk(
  "recipes/getRecipes",

  async ({ page = 1, limit = 12, filters }, thunkAPI) => {
    try {
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
      return {
        recipes: data?.recipes || [],
        pagination: {
          page: data?.page || 1,
          totalPages: data?.totalPages || 1,
          totalItems: data?.total || 0,
        },
      };
    } catch (error) {
      toast.error(
        error.response?.data?.messages ||
          error.message ||
          "Something went wrong!"
      );
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getFavorites = createAsyncThunk(
  "recipes/getFavorites",

  async ({ page = 1, limit = 10 }, thunkAPI) => {
    try {
      const response = await axiosAPI.get("/favorites", {
        params: { page, limit },
      });
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.messages || "Something went wrong!");
      return thunkAPI.rejectWithValue(error.response?.data?.messages);
    }
  }
);

export const getOwn = createAsyncThunk(
  "recipes/getOwn",

  async ({ page = 1, limit = 10 }, thunkAPI) => {
    try {
      const response = await axiosAPI.get("/recipes/my", {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.messages || "Something went wrong!");
      return thunkAPI.rejectWithValue(error.response?.data?.messages);
    }
  }
);

export const addOwnRecipe = createAsyncThunk(
  "recipes/addOwnRecipe",
  async (body, thunkAPI) => {
    try {
      const formData = new FormData();

      formData.append("title", body.title);
      formData.append("description", body.description);
      formData.append("cookingTime", body.cookingTime);
      formData.append("calories", body.calories);
      formData.append("category", body.category);
      formData.append("instructions", body.instructions);
      formData.append("ingredients", JSON.stringify(body.ingredients));
      if (body.image) {
        formData.append("image", body.image);
      }
      const res = await axiosAPI.post("/recipes/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message);
      console.log(res.data.data.recipe);
      return res.data.data.recipe;
    } catch (error) {
      // toast.error(error.response?.data?.messages || "Something went wrong!");
      return thunkAPI.rejectWithValue(error.response?.data?.messages);
    }
  }
);

