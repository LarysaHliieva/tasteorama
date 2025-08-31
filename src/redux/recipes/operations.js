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
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const addToFavorites = createAsyncThunk(
  "recipes/addToFavorites",
  async (recipeId, thunkAPI) => {
    try {
      const response = await axiosAPI.post(`/favorites/${recipeId}`);
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
      const response = await axiosAPI.delete(`/favorites/${recipeId}`);
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
    try {
      const response = await axiosAPI.get("/favorites");
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.messages || "Something went wrong!");
      return thunkAPI.rejectWithValue(error.response?.data?.messages);
    }
  }
);

export const getOwn = createAsyncThunk(
  "recipes/getOwn",

  async (_, thunkAPI) => {
    try {
      const response = await axiosAPI.get("/recipes/my");
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

      Object.keys(body).forEach((key) => {
        if (key === "ingredients") {
          formData.append("ingredients", JSON.stringify(body.ingredients));
        } else if (key !== "image") {
          formData.append(key, body[key]);
        }
      });

      if (body.image) {
        formData.append("image", body.image);
      }
      // console.log(body.image[0].type);
      // if (body.image && body.image[0] instanceof File) {
      //   formData.append("image", body.image[0]);
      // }

      const res = await axiosAPI.post("/recipes/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message);
      console.log(res.data.data.recipe);
      return res.data.data.recipe;
    } catch (error) {
      toast.error(error.response?.data?.messages || "Something went wrong!");
      return thunkAPI.rejectWithValue(error.response?.data?.messages);
    }
  }
);
