import { createSlice } from "@reduxjs/toolkit";
import {
  addToFavorites,
  getRecipeById,
  getRecipes,
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
    pagination: {
      page: 1,
      totalPages: 1,
      totalItems: 0,
    },
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
      .addCase(removeFromFavorites.rejected, handleRejected)
      .addCase(getRecipes.pending, handlePending)
      .addCase(getRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
       if (action.payload.page === 1) {
    state.all = action.payload.data.recipes;
  } else {
    state.all = [...state.all, ...action.payload.data.recipes];
  }
  state.pagination = {
    page: action.payload.data.pagination.page || 1,
          totalPages: action.payload.data.pagination.totalPages || 1,
          totalItems: action.payload.data.pagination.total || 0,
  };
      });
  },
});

export default recipesSlice.reducer;
