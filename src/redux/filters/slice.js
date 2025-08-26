import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories, fetchIngredients } from "./operations";


const initialState = {
  selected:{
  categories: [],
  ingredients: [],
  searchQuery: "",
},
 options:{
  categories:[],
  ingredients:[],
 }
};

const slice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeSearch: (state, action) => {
      state.selected.searchQuery = action.payload;
    },
    setCategories: (state, action) => {
      state.selected.categories = action.payload;
    },
    setIngredients: (state, action) => {
      state.selected.ingredients = action.payload;
    },
    resetFilters: (state)=> {
      state.selected = initialState.options;
    },
  },
  extraReducers:(builder) => {
    builder
    .addCase(fetchCategories.fulfilled, (state, action) => {
      state.options.categories = action.payload;
    })
    .addCase(fetchIngredients.fulfilled, (state,action) => {
      state.options.ingredients = action.payload;
    })
  }
});

export default slice.reducer;

export const { changeSearch, setCategories, setIngredients, resetFilters } =
  slice.actions;
