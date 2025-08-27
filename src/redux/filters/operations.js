import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../services/api";

export const fetchCategories = createAsyncThunk(
  "filters/fetchCategories",
  async (_,thunkAPI) => {
    try {
      const { data } = await axiosAPI.get("/categories")
      console.log("Raw Categories Response:",data);
      return data.data.map((c) => ({ label: c.name, value: c._id }));
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load categories"
      );
    }
  }
);

export const fetchIngredients = createAsyncThunk(
  "filters/fetchIngredients",
  async (_,thunkAPI) => {
    try {
      const { data } = await axiosAPI.get("/ingredients")
      return data.data.map((i) => ({ label: i.name, value: i._id }));
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load ingredients"
      );
    }
  }
);

