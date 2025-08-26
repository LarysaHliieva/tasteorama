import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "filters",
  initialState: {
    categories: [],
    ingredients: [],
    searchQuery: "",
  },
  reducers: {
    changeSearch: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setIngredients: (state, action) => {
      state.ingredients = action.payload;
    },
    resetFilters: (state) => {
      state.categories = [];
      state.ingredients = [];
      state.searchQuery = "";
    },
  },
  
});

export default slice.reducer;

export const { changeSearch,setCategories,setIngredients,resetFilters } = slice.actions;
