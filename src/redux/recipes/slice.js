import { createSlice } from "@reduxjs/toolkit";
import {
  addToFavorites,
  getRecipeById,
  getRecipes,
  removeFromFavorites,
  getFavorites,
  getOwn,
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
        const { recipes, pagination } = action.payload;

        if (pagination.page === 1) {
          state.all = recipes;
        } else {
          state.all = [...state.all, ...recipes];
        }

        state.pagination = pagination;
      })

      .addCase(getFavorites.pending, handlePending)
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorite = action.payload;
      })
      .addCase(getFavorites.rejected, handleRejected)

      .addCase(getOwn.pending, handlePending)
      .addCase(getOwn.fulfilled, (state, action) => {
        state.isLoading = false;
        const { data, page, totalPages, totalItems } = action.payload;

        if (page === 1) {
          state.favorite = data;
        } else {
          state.favorite = [...state.favorite, ...data];
        }

        state.pagination = {
          page,
          totalPages,
          totalItems,
        };
      })
      .addCase(getOwn.rejected, handleRejected);
  },
});

export default recipesSlice.reducer;
export const { clearCurrentRecipe } = recipesSlice.actions;
