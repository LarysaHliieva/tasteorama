import { createSlice } from "@reduxjs/toolkit";
import {
  addToFavorites,
  getRecipeById,
  removeFromFavorites,
} from "./operations.js";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    all: [],
    favorite: [],
    own: [],
    currentRecipe: null,
    isLoading: false,
    error: null,
  },

  reducers: {
    clearCurrentRecipe: (state) => {
      state.currentRecipe = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getRecipeById.pending, handlePending)
      .addCase(getRecipeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentRecipe = action.payload;
      })
      .addCase(getRecipeById.rejected, handleRejected)

      .addCase(addToFavorites.pending, handlePending)
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorite = action.payload;
      })
      .addCase(addToFavorites.rejected, handleRejected)

      .addCase(removeFromFavorites.pending, handlePending)
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorite = action.payload;
      })
      .addCase(removeFromFavorites.rejected, handleRejected);
  },
});

export default recipesSlice.reducer;
