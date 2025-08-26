import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk(
  "filters/fetchCategories",
  async () => {
    const res = await fetch("/categories");
    // "http://localhost:5000/categories"
    const data = await res.json();
    return data.data.map((c) => ({ label: c.name, value: c.id }));
  }
);

export const fetchIngredients = createAsyncThunk(
  "filters/fetchIngredients",
  async () => {
    const res = await fetch("/ingredients");
    // "http://localhost:5000/ingredients"
    const data = await res.json();
    return data.data.map((i) => ({ label: i.name, value: i.id }));
  }
);
